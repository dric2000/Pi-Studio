"use client";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import type { ProjectVideo as ProjectVideoData } from "@/content/projects";
import { cn } from "@/lib/utils";

type ProjectVideoProps = {
  video: ProjectVideoData;
  title: string;
  className?: string;
};

/**
 * Lecteur d'une fiche projet. YouTube : vignette légère (N&B, charte oblige), le lecteur n'est
 * chargé qu'au clic et la vidéo joue en couleur. Vidéo locale : lecteur natif, cadrée en vertical si besoin.
 */
export function ProjectVideo({ video, title, className }: ProjectVideoProps) {
  if ("youtubeId" in video) {
    return (
      <div className={cn("overflow-hidden bg-card", className)}>
        <LiteYouTubeEmbed
          id={video.youtubeId}
          title={title}
          poster="maxresdefault"
          webp
          noCookie
          wrapperClass="yt-lite grayscale transition-[filter] duration-700 [&.lyt-activated]:grayscale-0"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-card",
        video.vertical ? "mx-auto aspect-[9/16] max-h-[80svh]" : "aspect-video",
        className,
      )}
    >
      <video className="size-full object-cover" controls playsInline preload="metadata" poster={video.poster}>
        <source src={`${video.src}.webm`} type="video/webm" />
        <source src={`${video.src}.mp4`} type="video/mp4" />
      </video>
    </div>
  );
}
