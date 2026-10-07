import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_COOKIE, accessToken, getSitePassword } from "@/lib/site-access";

/** Verrou de la démo : sans le bon cookie, toute page redirige vers /acces. Inactif sans SITE_PASSWORD. */
export async function proxy(request: NextRequest) {
  const password = getSitePassword();
  if (!password) return NextResponse.next();

  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get(ACCESS_COOKIE)?.value;

  if (pathname === "/acces" || token === (await accessToken(password))) {
    return noIndex(NextResponse.next());
  }

  const url = new URL("/acces", request.url);
  if (pathname !== "/") url.searchParams.set("suite", pathname + search);
  return noIndex(NextResponse.redirect(url));
}

/** Tant que le site est verrouillé, aucun moteur de recherche ne doit l'indexer. */
function noIndex(response: NextResponse) {
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  // Restent publics : fichiers internes de Next, médias (dont le logo de la page d'accès),
  // icônes et image de partage (pour l'aperçu du lien sur WhatsApp et les réseaux), robots.txt.
  matcher: [
    "/((?!_next/static|_next/image|media/|icon.png|apple-icon.png|opengraph-image|robots.txt).*)",
  ],
};
