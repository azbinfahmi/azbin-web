import styles from "@/styles/homepage/SkillsSection.module.css";

const skillGroups = [
  {
    title: "Languages",
    items: ["JavaScript", "TypeScript"],
  },
  {
    title: "Frontend",
    items: [
      "HTML",
      "CSS",
      "Next.js",
      "AngularJS",
      "Data-Heavy UI Design",
      "Web-Based 3D Visualization",
    ],
  },
  {
    title: "Backend & APIs",
    items: [
      "Node.js",
      "REST APIs",
      "WebSocket",
      "PostgreSQL",
      "MQTT",
      "HTTP",
    ],
  },
  {
    title: "Real-Time & Data",
    items: [
      "Event-Driven Architecture",
      "Telemetry Systems",
      "Async Processing",
      "Data Validation Pipelines",
    ],
  },
  {
    title: "Systems & Tools",
    items: ["Docker", "Git", "Linux", "ThingsBoard"],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Skills</h2>

        <div className={styles.grid}>
          {skillGroups.map((group) => (
            <div key={group.title} className={styles.group}>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <ul className={styles.list}>
                {group.items.map((item) => (
                  <li key={item} className={styles.item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
