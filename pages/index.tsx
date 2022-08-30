import React from "react";
import styles from "../styles/Home.module.css";
import SessionTab from "./session/SessionTab";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <SessionTab />
      </main>
    </div>
  );
}
