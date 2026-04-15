import styles from "@/styles/homepage/WhatIBuild.module.css";
import { Container } from "@/components/layout/Container";


const capabilities = [
  {
    title: "Real-Time Platforms",
    description:
      "Event-driven web platforms using WebSockets for live telemetry, system status, and alerts.",
  },
  {
    title: "Data Ingestion & Validation",
    description:
      "Structured pipelines to ingest, validate, and transform high-volume data from devices and external systems.",
  },
  {
    title: "Async Processing Systems",
    description:
      "Background jobs and long-running workflows for file processing, automation, and data transformation.",
  },
  {
    title: "Web-Based Visualization",
    description:
      "Data-heavy dashboards and browser-based 3D visualization for operational insight.",
  },
];

export function WhatIBuild() {
  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.heading}>What I Build</h2>

        <div className={styles.grid}>
          {capabilities.map((item) => (
            <div key={item.title} className={styles.card}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
