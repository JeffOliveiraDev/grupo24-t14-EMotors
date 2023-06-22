import styles from "./styles.module.scss";
import InputMask from "react-input-mask";

interface iInput {
  register?: any;
  name?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  id?: string | undefined;
  placeholder?: string | undefined;
  error?: string | undefined;
  label?: string | undefined;
  textarea?: boolean;
  value?: string | undefined;
  labelClass?: string | undefined;
  inputMask?: boolean;
  mask?: string | (string | RegExp)[];
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const Input = ({
  register,
  name,
  type,
  id,
  placeholder,
  error,
  label,
  textarea,
  value,
  labelClass,
  onChange,
  mask,
  inputMask,
}: iInput) => {
  const prop = {
    onChange,
    name,
    type,
    id,
    placeholder,
    error,
    value,
    styles,
  };

  const funcInput = () => {
    if (textarea) {
      return (
        <textarea
          className={error ? styles.red : styles.textarea}
          {...register}
          {...prop}
        />
      );
    }

    if (!textarea && !inputMask) {
      return (
        <input
          className={error ? styles.red : styles.input}
          {...register}
          {...prop}
        />
      );
    }

    delete prop.placeholder;

    const propMask = {
      placeholder,
    };

    return (
      <InputMask
        maskChar="_"
        className={error ? styles.red : styles.input}
        {...register}
        {...prop}
        mask={mask!}
        {...propMask}
      />
    );
  };

  return (
    <div className={styles.conteiner}>
      {label && (
        <label className={!labelClass ? styles.label : labelClass} htmlFor={id}>
          {label}
        </label>
      )}
      {funcInput()}

      <small className={styles.small}>{error}</small>
    </div>
  );
};

export default Input;
