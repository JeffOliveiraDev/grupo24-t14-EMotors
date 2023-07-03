import styles from "./styles.module.scss";

const TagUser = ({ name }: { name: string | null }) => {
  return (
    <>
      <span className={styles.span}>
        {name && name[0].toUpperCase() + name[1].toUpperCase()}
      </span>
      <p className={styles.p}>{name && name}</p>
    </>
  );
};

export default TagUser;
