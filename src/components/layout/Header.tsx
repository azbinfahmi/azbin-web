import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/layout/Header.module.css";

const navItems = [
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
  const sectionIds = ["home", ...navItems.map((item) => item.id)];
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean) as HTMLElement[];

  const handleScroll = () => {
    const headerHeight = headerRef.current?.offsetHeight ?? 64;
    const buffer = headerHeight + 10;

    let current = sections[0]?.id ?? "home";

    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= buffer) {
        current = section.id;
      }
    }

    setActiveSection(current);
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={styles.inner}>
        <Link href="#home" className={styles.brand}>
          Azbin Fahmi
        </Link>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`${styles.link} ${isActive ? styles.active : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          className={styles.menuButton}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className={styles.mobileMenu}>
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={styles.mobileLink}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}