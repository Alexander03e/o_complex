"use client";
import styles from "./styles.module.css";

interface IButton {
  title: unknown;
  onClick?: () => void;
  props?: JSX.IntrinsicAttributes;
}

export const Button = ({
  title,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  onClick?: () => void;
}) => {
  return (
    <button className={styles.button} onClick={onClick} {...props}>
      {title}
    </button>
  );
};
