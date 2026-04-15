// components/home/HomeHero.tsx
import { useEffect, useState } from "react";
import styles from '@/styles/homepage/HomeHero.module.css'
import { Container } from "@/components/layout/Container";

const fullText = "Full-Stack Developer focused on real-time data systems";

export function HomeHero() {
  
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return; // ⬅ prevent immediate start

    const typingSpeed = isDeleting ? 25 : 40;
    const pauseAfterTyping = 1200;
    const pauseAfterDeleting = 400;

    let timeout: NodeJS.Timeout;

    if (!isDeleting && index < fullText.length) {
      timeout = setTimeout(() => {
        setText(fullText.slice(0, index + 1));
        setIndex(index + 1);
      }, typingSpeed);
    } else if (!isDeleting && index === fullText.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseAfterTyping);
    } else if (isDeleting && index > 0) {
      timeout = setTimeout(() => {
        setText(fullText.slice(0, index - 1));
        setIndex(index - 1);
      }, typingSpeed);
    } else if (isDeleting && index === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
      }, pauseAfterDeleting);
    }

    return () => clearTimeout(timeout);
  }, [index, isDeleting, hasStarted]);


  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 300),   // title
      setTimeout(() => setStage(2), 800),   // description
      setTimeout(() => setStage(3), 1100),  // buttons
      setTimeout(() => setStage(4), 1400),  // code card
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className={styles.hero}>
      <Container>
        <div className={styles.glowLeft} />
        <div className={styles.glowRight} />
        <div className={styles.grid}>
          
          {/* LEFT */}
          <div className={styles.left}>
            <h1 className={`${styles.title} ${stage >= 1 ? styles.show : ""}`}>
              Hi, I&apos;m <span>Azbin Fahmi </span>
            </h1>

            <h2 className={styles.role}>
              {text}
              <span className={styles.cursor}>|</span>
            </h2>

            <p className={`${styles.description} ${stage >= 2 ? styles.show : ""}`}>
              I build real-time web systems that ingest live data,
              process it reliably, and turn it into usable dashboards.
            </p>

            <div className={`${styles.actions} ${stage >= 3 ? styles.show : ""}`}>
              <a href="#projects" className={styles.primary}>
                View Projects
              </a>
              <a href="#contact" className={styles.secondary}>
                Get In Touch
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className={styles.right}>
             <div className={`${styles.codeCard} ${stage >= 4 ? styles.show : ""}`}>
              <div className={styles.codeHeader}>
                <span />
                <span />
                <span />
                <p>system.ts</p>
              </div>
              <pre>
                {`const system = {
  role: "Full-Stack Developer",
  focus: "Real-time Data Systems",
  stack: ["Node.js", "TypeScript", "PostgreSQL"],
  realtime: true,
};

system.build();`}
              </pre>
             </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
