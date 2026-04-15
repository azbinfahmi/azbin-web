import Image from "next/image";
import styles from "@/styles/homepage/AboutSection.module.css";
import { Container } from "@/components/layout/Container";

export function AboutSection() {
  return (
    <section id="about" className={styles.section}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.left}>
            <span className={styles.label}>ABOUT</span>

            <h2 className={styles.title}>
              <span>Full-Stack Developer</span>, Real-Time Platforms 
            </h2>

            <div className={styles.card}>
              <p>
                I build production systems that process live data end-to-end — from
                ingestion and validation to real-time visualization.
              </p>

              <p>
                My focus is on reliability, observability, and maintainable
                architecture. I design systems that reduce manual effort and remain
                understandable under load.
              </p>
            </div>

            <div className={styles.stats}>
              <div>
                <h3>2+</h3>
                <span>Years Production Experience</span>
              </div>

              <div>
                <h3>IoT</h3>
                <span>Monitoring Platforms</span>
              </div>

              <div>
                <h3>Ops</h3>
                <span>Automation Tools</span>
              </div>
            </div>
          </div>

          <div className={styles.right}>
            <Image
              src="/images/profile.png"
              alt="Azbin Fahmi"
              width={420}
              height={550}
              className={styles.image}
            />
          </div>
        </div>

      </Container>
    </section>
  );
}
