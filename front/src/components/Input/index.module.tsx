import { HTMLInputTypeAttribute } from "react";
import styles from "./styles.module.scss";

interface iInput {
  register?: any;
  name?: string;
  type?: HTMLInputTypeAttribute | undefined;
  id?: string | undefined;
  placeholder?: string | undefined;
  error?: string | undefined;
  label?: string | undefined;
}

const Input = ({
  register,
  name,
  type,
  id,
  placeholder,
  error,
  label,
}: iInput) => {
  const prop = {
    name,
    type,
    id,
    placeholder,
    error,
  };
  return (
    <>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className={error ? styles.red : styles.input}
        {...register}
        {...prop}
      />
      <small className={styles.small}>{error}</small>
    </>
  );
};

export default Input;
