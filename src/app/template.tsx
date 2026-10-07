import { PageLoader } from "@/components/site/page-loader";

/** Le template est remonté à chaque navigation : le loader s'affiche donc avant chaque page. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageLoader>{children}</PageLoader>;
}
