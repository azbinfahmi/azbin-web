import styles from "@/styles/homepage/SelectedSystems.module.css";
import { Container } from "@/components/layout/Container";

const systems = [
  {
    title: "Real-Time Monitoring Platform",
    problem:
      "Operational teams need live visibility into device status, telemetry, and system health.",
    solution:
      "An event-driven web platform with real-time data streaming, alerting, and system dashboards.",
    href: "/projects/real-time-monitoring",
  },
  {
    title: "Large File Processing Platform",
    problem:
      "Manual processing of large datasets is slow, error-prone, and blocks downstream work.",
    solution:
      "An asynchronous processing system with job queues, progress tracking, and result visualization.",
    href: "/projects/large-file-processing",
  },
  {
    title: "3D Web Visualization",
    problem:
      "Complex spatial and structured data is difficult to understand through tables alone.",
    solution:
      "Browser-based 3D visualization enabling interactive exploration of processed datasets.",
    href: "/projects/3d-visualization",
  },
];

export function SelectedSystems() {
  return (
    <section id="projects" className={styles.section}>
      <Container>
        <h2 className={styles.heading}>Selected Systems</h2>

        <div className={styles.list}>
          {systems.map((system) => (
            <a key={system.title} href={system.href} className={styles.item}>
              <h3 className={styles.title}>{system.title}</h3>

              <p className={styles.problem}>
                <strong>Problem:</strong> {system.problem}
              </p>

              <p className={styles.solution}>
                <strong>System:</strong> {system.solution}
              </p>

              <span className={styles.link}>View system →</span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
