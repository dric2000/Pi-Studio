# π Studio — site vitrine

Site du studio de production audiovisuelle π Studio (PYE Studio), Abidjan.
Next.js 16 (App Router), Tailwind CSS 4, shadcn/ui, Motion, Lenis. Charte noir & blanc strict.

## Démarrer

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

Variables d'environnement : voir [`.env.example`](.env.example) (envoi du formulaire via Resend,
adresse publique du site pour les aperçus de partage). Sans clé Resend, le formulaire de contact
fonctionne en **mode démonstration** et le dit clairement au visiteur.

## Où modifier quoi

| Contenu | Fichier |
|---|---|
| Contacts, réseaux, chiffres, services, méthode, distinctions | `src/content/site.ts` |
| Réalisations (ajouter une vidéo YouTube : `video: { youtubeId: "…" }`) | `src/content/projects.ts` |
| Page « Le Studio » (frise, valeurs, collectif, presse) | `src/content/studio.ts` |
| Mentions légales / confidentialité | `src/app/mentions-legales`, `src/app/confidentialite` |

Les informations à valider avec le studio sont marquées **« À CONFIRMER »** dans le code, et
affichées **« À compléter »** sur les pages légales.

## Médias

Les fichiers bruts vont dans `assets/`, le script les prépare dans `public/media/` :

```bash
npm run media              # tout
npm run media -- images    # photos : recadrage, noir & blanc
npm run media -- videos    # vidéos hero : découpe, N&B, mobile + desktop, MP4/WebM, posters (ffmpeg requis)
npm run media -- brand     # logo transparent, favicon, icône Apple, image de partage
```

Réglages (recadrages, plans conservés, étalonnage) en tête de `scripts/process-media.mjs`.

## Structure

- `src/app` — pages (`template.tsx` affiche le loader π avant chaque page)
- `src/components/home` — sections de l'accueil
- `src/components/motion` — animations (révélations, compteur, défilement fluide)
- `src/components/studio` — éléments de la charte (repère de scène, timecode, REC, fiche projet…)
- `src/components/site` — en-tête, pied de page, loader
- `/styleguide` — page de travail interne (exclue du référencement) présentant la direction artistique

## Avant la mise en ligne

- [ ] Liens YouTube des réalisations et vrais visuels (retirer les `placeholder`)
- [ ] Vérifier le numéro WhatsApp (`src/content/site.ts`)
- [ ] Compléter et faire relire par un juriste les pages légales ; formalités ARTCI
- [ ] Renseigner `NEXT_PUBLIC_SITE_URL` et la clé Resend
- [ ] Supprimer ou protéger `/styleguide`
