const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/**
 * Grain de pellicule à peine visible sur tout le site. En mode « overlay », il laisse le noir pur
 * intact et ne texture que les images, les gris et le texte.
 */
export function FilmGrain() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] overflow-hidden opacity-[0.12] mix-blend-overlay">
      <div
        className="animate-grain absolute -inset-1/2"
        style={{ backgroundImage: NOISE, backgroundSize: "200px 200px" }}
      />
    </div>
  );
}
