import styles from "@/styles/layout/Footer.module.css";
import { Container } from "@/components/layout/Container";

export function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.contact}>
            {/* <span className={styles.eyebrow}>// connect.sh</span> */}

            {/* <div className={styles.status}>
              <span className={styles.dot} />
              <span className={styles.statusText}>Available for opportunities</span>
            </div> */}

            <h2 className={styles.heading}>Let's build something</h2>

            <p className={styles.text}>
              Interested in discussing real-time systems, data platforms, or
              potential collaboration? Feel free to reach out.
            </p>

            <div className={styles.actions}>
              <a href="mailto:azbinfahmi@gmail.com" className={styles.primary}>
                azbinfahmi@gmail.com
              </a>

              <a
                href="https://www.linkedin.com/in/azbin-fahmi-39b3693a2/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondary}
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className={styles.bottomBar}>
            <span>© {new Date().getFullYear()} Azbin Fahmi</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}