import { useEffect, useState } from "react";
import styles from "@/styles/lighting/GlobalGlow.module.css";

export function GlobalGlow() {
    const [scrollY, setScrollY] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
        const currentScroll = window.scrollY;
        const viewportHeight = window.innerHeight;

        const homeSection = document.getElementById("home");
        if (!homeSection) return;

        const homeRect = homeSection.getBoundingClientRect();
        const homeBottomAbsolute =
        currentScroll + homeRect.bottom;

        const centerPosition =
        currentScroll + viewportHeight / 2;

        const newTop =
        centerPosition > homeBottomAbsolute
            ? centerPosition
            : homeBottomAbsolute;

        setScrollY(newTop);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    if (!mounted) return null;

    return (
        <div
            className={styles.glow}
            style={{top: scrollY}}
        />
    );
}
