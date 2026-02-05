import "@/styles/futsal.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname.startsWith("/futsal")) {
      document.body.setAttribute("data-futsal", "true");
    } else {
      document.body.removeAttribute("data-futsal");
    }
  }, [router.pathname]);

  return <Component {...pageProps} />;
}
