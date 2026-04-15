import "@/styles/futsal.css";
import "@/styles/portfolio-vars.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GlobalGlow } from "@/components/lighting/GlobalGlow";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname.startsWith("/futsal")) {
      document.body.setAttribute("data-futsal", "true");
      document.body.removeAttribute("data-portfolio");
    } else {
      document.body.setAttribute("data-portfolio", "true");
      document.body.removeAttribute("data-futsal");
    }
  }, [router.pathname]);

  return (
    <>
      <GlobalGlow />
      <Component {...pageProps} />
    </>
  );
}
