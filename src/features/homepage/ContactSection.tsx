import styles from "@/styles/homepage/ContactSection.module.css";

export function ContactSection() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Contact</h2>

        <p className={styles.text}>
          If you’re interested in discussing real-time systems, data platforms,
          or potential collaboration, feel free to reach out.
        </p>

        <div className={styles.actions}>
          <a
            href="mailto:azbinfahmi@gmail.com"
            className={styles.primary}
          >
            azbinfahmi@gmail.com
          </a>

          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
