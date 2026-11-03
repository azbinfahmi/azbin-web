import "@/styles/futsal.css";
import "@/styles/portfolio-vars.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GlobalGlow } from "@/components/lighting/GlobalGlow";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isEInvite = router.pathname.startsWith('/e-invite');

  useEffect(() => {
    if (router.pathname.startsWith("/futsal")) {
      document.body.setAttribute("data-futsal", "true");
      document.body.removeAttribute("data-portfolio");
    } else if (isEInvite) {
      document.body.removeAttribute("data-portfolio");
      document.body.removeAttribute("data-futsal");
      document.body.style.background = "radial-gradient(ellipse at 60% 35%, #7a3a10 0%, #3d1a06 55%, #2a1005 100%)";
      document.body.style.margin = "0";
    } else {
      document.body.style.background = "";
      document.body.style.margin = "";
      document.body.setAttribute("data-portfolio", "true");
      document.body.removeAttribute("data-futsal");
    }
  }, [router.pathname, isEInvite]);

  return (
    <>
      {!isEInvite && <GlobalGlow />}
      <Component {...pageProps} />
    </>
  );
}
