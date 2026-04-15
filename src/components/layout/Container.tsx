import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        maxWidth: "min(1100px, 90vw)",
        padding: "0 24px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
}
