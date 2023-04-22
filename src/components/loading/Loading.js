/** @format */

import React from "react";
import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.backgroundcolor}>
      <div className={styles.boxLoading}></div>  
    </div>
  );
}
