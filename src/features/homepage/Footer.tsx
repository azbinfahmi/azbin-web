import styles from "@/styles/layout/Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span>© {new Date().getFullYear()} Azbin Fahmi</span>
        <span>Built with Next.js</span>
      </div>
    </footer>
  );
}
