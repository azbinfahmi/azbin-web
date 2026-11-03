import styles from "@/styles/homepage/SkillsSection.module.css";
import { Container } from "@/components/layout/Container";

const skillGroups = [
  {
    code: "LANG",
    title: "Languages",
    accent: "gray",
    items: ["JavaScript", "TypeScript"],
  },
  {
    code: "FE",
    title: "Frontend",
    accent: "teal",
    items: ["HTML", "CSS", "React", "Next.js", "AngularJS", "Web-Based 3D Visualization"],
  },
  {
    code: "BE",
    title: "Backend & APIs",
    accent: "blue",
    items: ["Node.js", "REST APIs", "WebSocket", "MQTT", "PostgreSQL"],
  },
  {
    code: "RT",
    title: "Real-Time & Data",
    accent: "amber",
    items: ["Event-Driven Architecture", "Telemetry Systems", "Async Processing", "Data Validation Pipelines"],
  },
  {
    code: "SYS",
    title: "Systems & Tools",
    accent: "gray",
    items: ["Docker", "Git", "ThingsBoard"],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className={styles.section}>
      <Container>
        <div className={styles.inner}>
          {/* <span className={styles.eyebrow}>// stack.json</span> */}
          <h2 className={styles.heading}>Skills</h2>

          <div className={styles.grid}>
            {skillGroups.map((group) => (
              <div key={group.title} className={styles.group} data-accent={group.accent}>
                <span className={styles.borderGlow} />
                <div className={styles.groupHeader}>
                  <span className={styles.groupCode}>{group.code}</span>
                  <h3 className={styles.groupTitle}>{group.title}</h3>
                  <span className={styles.dot} />
                </div>

                <div className={styles.tags}>
                  {group.items.map((item) => (
                    <span key={item} className={styles.tag}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}