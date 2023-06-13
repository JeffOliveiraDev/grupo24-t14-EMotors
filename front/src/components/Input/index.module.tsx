import styles from "./styles.module.scss";

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
  checked?: boolean | undefined;
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
  checked,
  onChange,
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
    checked,
  };

  return (
    <div className={styles.conteiner}>
      {label && (
        <label className={!labelClass ? styles.label : labelClass} htmlFor={id}>
          {label}
        </label>
      )}
      {!textarea ? (
        <input
          className={error ? styles.red : styles.input}
          {...register}
          {...prop}
        />
      ) : (
        <textarea
          className={error ? styles.red : styles.textarea}
          {...register}
          {...prop}
        />
      )}
      <small className={styles.small}>{error}</small>
    </div>
  );
};

export default Input;
