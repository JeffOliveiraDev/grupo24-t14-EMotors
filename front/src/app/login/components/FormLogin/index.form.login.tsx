import Link from "next/link";
import styles from "../FormLogin/styles.module.scss";

const FormLogin = () => {
  return (
    <div className={styles.conteiner}>
      <h3>Login</h3>

      <form>
        <div className={styles.firstInput}>
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" placeholder="Digitar email" />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" placeholder="Digitar senha" />
          <Link href="/help">Esqueci minha senha</Link>
        </div>
        <button type="submit">Entrar</button>
        <span>Ainda não possui conta?</span>
        <Link href="/register">Cadastrar</Link>
      </form>
    </div>
  );
};

export default FormLogin;
