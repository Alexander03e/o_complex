// "use client";
import styles from "./styles.module.css";
import HTMLReactParser from "html-react-parser/lib/index";
import DOMPurify from "isomorphic-dompurify";
import { useEffect, useState } from "react";
// import {JSDOM}
export const ReviewCard = async ({
  id,
  text,
}: {
  id: number;
  text: string;
}) => {
  // const [safeText, setSafeText] = useState<string>("");
  // useEffect(() => {
  const safeText = DOMPurify.sanitize(text);
  // }, []);
  return (
    <div className={styles.wrapper}>
      <p className={styles.content}>{HTMLReactParser(safeText)}</p>
    </div>
  );
};
