import Image from "next/image";
import styles from "../../../styles/headerH1.module.css";

export default function HeaderH1({title}) {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
    </div> 
  );
}