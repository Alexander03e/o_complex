import { HTMLAttributes } from "react";
import styles from "./styles.module.css";
export const Popup: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  title,
  ...props
}) => {
  return (
    <div className={styles.popup} {...props}>
      <h2>{title}</h2>
    </div>
  );
};
