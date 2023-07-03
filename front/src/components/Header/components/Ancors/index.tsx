import Link from "next/link";
import styles from "./styles.module.scss";

const Ancors = () => {
  return (
    <div className={styles.conteiner}>
      <Link className={styles.login} href="/login">
        Fazer Login
      </Link>
      <Link className={styles.register} href="/register">
        Cadastrar
      </Link>
    </div>
  );
};

export default Ancors;
