#!/usr/bin/env node
/**
 * Prépare les médias bruts de `assets/` pour le site (sortie dans `public/media/`).
 *
 *   npm run media              → images + vidéos
 *   npm run media -- images    → images seulement
 *   npm run media -- videos    → vidéos seulement
 *   npm run media -- brand     → logo, favicon et image de partage
 *
 * Images (sharp) : recadrage des éléments d'interface Instagram, noir & blanc, export JPEG.
 *   Le redimensionnement et la conversion AVIF/WebP sont laissés à next/image.
 * Vidéos (ffmpeg requis) : découpe, étalonnage, suppression du son, version mobile
 *   (verticale) + version desktop (16:9 avec fond flou), MP4 + WebM, images poster
 *   (dont une par colonne pour le hero desktop en 3 colonnes).
 * Logo (sharp) : le logo blanc sur noir devient blanc sur transparent (la luminosité sert de
 *   masque), en version complète et π seul ; génère aussi favicon, icône Apple et image Open Graph.
 */
import { execFile } from "node:child_process";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import sharp from "sharp";

const run = promisify(execFile);
const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "assets");
const OUT = path.join(ROOT, "public", "media");

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/** Photos converties en noir & blanc, comme les vidéos (charte monochrome). */
const IMAGES_GRAYSCALE = true;

/** Pixels à retirer sur chaque bord (barre de capture, flèches, points, avatar). */
const IMAGES = [
  {
    src: "Capture d’écran du 2026-10-07 09-41-23.png",
    out: "studio-operateur-camera",
    trim: { top: 4 },
  },
  {
    src: "Capture d’écran du 2026-10-07 09-55-45.png",
    out: "evenement-pye-communaute",
    trim: { top: 4, left: 4, right: 45 },
  },
  {
    src: "Capture d’écran du 2026-10-07 09-57-50.png",
    out: "portrait-costume",
    trim: { top: 4, bottom: 30 },
  },
  {
    src: "Capture d’écran du 2026-10-07 09-59-47.png",
    out: "rencontre-partenaires",
    trim: { top: 4 },
  },
  {
    src: "Capture d’écran du 2026-10-07 10-00-02.png",
    out: "dejeuner-partenaires",
    trim: { top: 4, left: 45, bottom: 25 },
  },
  {
    src: "Capture d’écran du 2026-10-07 10-00-35.png",
    out: "rencontre-officielle",
    trim: { top: 4, right: 45, bottom: 50 },
  },
];

const VIDEOS = [
  {
    src: "BTS 1 - Smartphone..mp4",
    out: "hero-bts",
    // Plans conservés, en secondes [début, fin[ (écarte le plan noir à 10 s et la fin).
    segments: [
      [2, 10],
      [11, 18],
    ],
    grade: {
      brightness: -0.06, // assombrit légèrement pour la lisibilité du texte blanc
      contrast: 1.08,
      saturation: 0.9,
      grayscale: true, // noir & blanc, raccord avec la charte
    },
    poster: 3, // seconde (dans la vidéo montée) utilisée pour l'image poster
    // Hero desktop en 3 colonnes : la version mobile est jouée 3 fois avec ces décalages (s).
    // Un poster par colonne est extrait au même instant.
    columns: [0, 5, 10],
  },
];

/** Logo source : blanc sur fond noir pur. */
const LOGO = "Logo π en microtypographie STUDIO.png";
const APP = path.join(ROOT, "src", "app");

/** Formats de sortie vidéo. */
const MOBILE = { width: 720, height: 1280 };
const DESKTOP = { width: 1280, height: 720 };
const MAX_HERO_BYTES = 2 * 1024 * 1024;

// ---------------------------------------------------------------------------
// Images
// ---------------------------------------------------------------------------

async function processImages() {
  const dir = path.join(OUT, "images");
  await mkdir(dir, { recursive: true });

  for (const { src, out, trim } of IMAGES) {
    const input = path.join(SRC, "images", src);
    const { width, height } = await sharp(input).metadata();
    const { top = 0, right = 0, bottom = 0, left = 0 } = trim;

    const output = path.join(dir, `${out}.jpg`);
    const info = await sharp(input)
      .extract({ left, top, width: width - left - right, height: height - top - bottom })
      .grayscale(IMAGES_GRAYSCALE)
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(output);

    log(`image  ${out}.jpg`, `${info.width}×${info.height}`, info.size);
  }
}

// ---------------------------------------------------------------------------
// Vidéos
// ---------------------------------------------------------------------------

/** Filtre ffmpeg : concatène les segments puis applique l'étalonnage → [v]. */
function cutAndGrade({ segments, grade }) {
  const parts = segments.map(
    ([start, end], i) => `[0:v]trim=start=${start}:end=${end},setpts=PTS-STARTPTS[s${i}]`,
  );
  const inputs = segments.map((_, i) => `[s${i}]`).join("");
  const eq = `eq=brightness=${grade.brightness}:contrast=${grade.contrast}:saturation=${grade.grayscale ? 0 : grade.saturation}`;
  return [...parts, `${inputs}concat=n=${segments.length}:v=1:a=0,${eq},fps=30[v]`];
}

/** Version verticale plein écran pour mobile. */
function mobileGraph(video) {
  const { width: w, height: h } = MOBILE;
  return [
    ...cutAndGrade(video),
    `[v]scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h},setsar=1[out]`,
  ].join(";");
}

/** Version 16:9 : la vidéo verticale centrée sur une copie agrandie, floutée et assombrie. */
function desktopGraph(video) {
  const { width: w, height: h } = DESKTOP;
  return [
    ...cutAndGrade(video),
    `[v]split[bg][fg]`,
    `[bg]scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h},boxblur=30:3,eq=brightness=-0.25[bgb]`,
    `[fg]scale=-2:${h}[fgs]`,
    `[bgb][fgs]overlay=(W-w)/2:0,setsar=1[out]`,
  ].join(";");
}

const ENCODERS = {
  mp4: [
    "-c:v", "libx264", "-preset", "slow", "-crf", "28",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart",
  ],
  webm: ["-c:v", "libvpx-vp9", "-crf", "40", "-b:v", "0", "-row-mt", "1", "-deadline", "good"],
};

async function ffmpeg(args) {
  await run("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], {
    maxBuffer: 1024 * 1024 * 16,
  });
}

async function processVideos() {
  try {
    await run("ffmpeg", ["-version"]);
  } catch {
    console.error("✗ ffmpeg introuvable. Installe-le avec : sudo apt install ffmpeg");
    process.exitCode = 1;
    return;
  }

  const dir = path.join(OUT, "videos");
  await mkdir(dir, { recursive: true });

  for (const video of VIDEOS) {
    const input = path.join(SRC, "videos", video.src);

    for (const [variant, graph] of [
      ["mobile", mobileGraph(video)],
      ["desktop", desktopGraph(video)],
    ]) {
      const base = path.join(dir, `${video.out}-${variant}`);

      for (const [ext, codec] of Object.entries(ENCODERS)) {
        const file = `${base}.${ext}`;
        await ffmpeg(["-i", input, "-filter_complex", graph, "-map", "[out]", "-an", ...codec, file]);
        const { size } = await stat(file);
        log(`video  ${path.basename(file)}`, variant, size, size > MAX_HERO_BYTES);
      }

      // Poster : extrait de la version MP4 déjà montée et étalonnée.
      const poster = `${base}.jpg`;
      await ffmpeg(["-ss", String(video.poster), "-i", `${base}.mp4`, "-frames:v", "1", "-q:v", "3", poster]);
      log(`poster ${path.basename(poster)}`, variant, (await stat(poster)).size);
    }

    for (const [i, offset] of (video.columns ?? []).entries()) {
      const poster = path.join(dir, `${video.out}-col-${i}.jpg`);
      await ffmpeg(["-ss", String(offset), "-i", path.join(dir, `${video.out}-mobile.mp4`), "-frames:v", "1", "-q:v", "3", poster]);
      log(`poster ${path.basename(poster)}`, `col ${i}`, (await stat(poster)).size);
    }
  }
}

// ---------------------------------------------------------------------------
// Logo & identité
// ---------------------------------------------------------------------------

/**
 * Repère les blocs de lignes contenant du blanc (le π, puis « STUDIO ») et leur étendue horizontale.
 * Évite de coder en dur des coordonnées : un nouveau logo de même composition fonctionne tel quel.
 */
async function findBlocks(input, threshold = 80, gap = 12) {
  const { data, info } = await sharp(input).greyscale().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const lit = (x, y) => data[y * width + x] > threshold;

  const rows = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) if (lit(x, y)) { rows.push(y); break; }
  }
  const blocks = [];
  let start = rows[0];
  for (let i = 1; i <= rows.length; i++) {
    if (i === rows.length || rows[i] - rows[i - 1] > gap) {
      const top = start, bottom = rows[i - 1];
      let left = width, right = 0;
      for (let y = top; y <= bottom; y++)
        for (let x = 0; x < width; x++) if (lit(x, y)) { left = Math.min(left, x); right = Math.max(right, x); }
      blocks.push({ left, top, width: right - left + 1, height: bottom - top + 1 });
      start = rows[i];
    }
  }
  return blocks;
}

/** Union de rectangles, agrandie d'une marge et bornée à l'image. */
function box(rects, margin, size) {
  const left = Math.max(0, Math.min(...rects.map((r) => r.left)) - margin);
  const top = Math.max(0, Math.min(...rects.map((r) => r.top)) - margin);
  const right = Math.min(size.width, Math.max(...rects.map((r) => r.left + r.width)) + margin);
  const bottom = Math.min(size.height, Math.max(...rects.map((r) => r.top + r.height)) + margin);
  return { left, top, width: right - left, height: bottom - top };
}

/** Blanc sur transparent : la luminosité de l'original devient le canal alpha (anticrénelage conservé). */
async function whiteOnTransparent(input, region) {
  const alpha = await sharp(input).extract(region).greyscale().raw().toBuffer();
  return sharp({ create: { width: region.width, height: region.height, channels: 3, background: "#ffffff" } })
    .joinChannel(alpha, { raw: { width: region.width, height: region.height, channels: 1 } })
    .png()
    .toBuffer();
}

/** Logo centré sur un fond noir, à une hauteur donnée. */
async function onBlack(logo, width, height, logoHeight) {
  const resized = await sharp(logo).resize({ height: logoHeight }).toBuffer();
  return sharp({ create: { width, height, channels: 4, background: "#000000" } })
    .composite([{ input: resized, gravity: "center" }])
    .png();
}

async function processBrand() {
  const input = path.join(SRC, "images", LOGO);
  const size = await sharp(input).metadata();
  const blocks = await findBlocks(input);
  if (blocks.length < 2) throw new Error(`Logo : ${blocks.length} bloc(s) trouvé(s), 2 attendus (π + STUDIO).`);
  const [mark, word] = [blocks[0], blocks.at(-1)];

  const dir = path.join(OUT, "brand");
  await mkdir(dir, { recursive: true });

  const full = await whiteOnTransparent(input, box([mark, word], 8, size));
  const piOnly = await whiteOnTransparent(input, box([mark], 8, size));

  for (const [name, buffer] of [["logo.png", full], ["logo-mark.png", piOnly]]) {
    const info = await sharp(buffer).toFile(path.join(dir, name));
    log(`brand  ${name}`, `${info.width}×${info.height}`, info.size);
  }

  // Conventions de fichiers Next.js (app/icon.png, app/apple-icon.png, app/opengraph-image.png).
  const outputs = [
    ["icon.png", await onBlack(piOnly, 512, 512, 360)],
    ["apple-icon.png", await onBlack(piOnly, 180, 180, 124)],
    ["opengraph-image.png", await onBlack(full, 1200, 630, 440)],
  ];
  for (const [name, image] of outputs) {
    const info = await image.toFile(path.join(APP, name));
    log(`brand  app/${name}`, `${info.width}×${info.height}`, info.size);
  }
}

// ---------------------------------------------------------------------------

function log(label, detail, bytes, warn = false) {
  const kb = `${Math.round(bytes / 1024)} Ko`.padStart(8);
  console.log(`${warn ? "⚠" : "✓"} ${label.padEnd(36)} ${String(detail).padEnd(10)} ${kb}${warn ? "  (> 2 Mo)" : ""}`);
}

const only = process.argv[2];
if (!only || only === "images") await processImages();
if (!only || only === "videos") await processVideos();
if (!only || only === "brand") await processBrand();
