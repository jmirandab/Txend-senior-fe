import Image from "next/image";
import styles from "./page.module.css";
import TaskGrid from "@/components/TaskGrid";
import { Button } from "@mui/material";



export default function Home() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        Task Manager 
        <TaskGrid />
      </main>
      {/* <footer className={styles.footer}>
        
      </footer> */}
    </div>
  );
}
