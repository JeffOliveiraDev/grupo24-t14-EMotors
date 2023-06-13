import Link from "next/link";
import styles from "../FormLogin/styles.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SchemaLogin from "../../schema/index.schema";
import { toast } from "react-toastify";
import { z } from "zod";

const FormLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SchemaLogin),
  });

  const create = (data: any) => {
    console.log(data);
    toast.success("Sucesso!");
  };

  const error = {
    email: errors.email?.message?.toString(),
    password: errors.password?.message?.toString(),
  };

  return (
    <div className={styles.conteiner}>
      <h3>Login</h3>

      <form onSubmit={handleSubmit(create)}>
        <div className={styles.firstInput}>
          <label htmlFor="email">E-mail</label>
          <input
            className={error.email ? styles.red : ""}
            {...register("email")}
            name="email"
            type="text"
            id="email"
            placeholder="Digitar email"
          />
          <small>{error.email}</small>
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input
            className={error.password ? styles.red : ""}
            {...register("password")}
            name="password"
            type="password"
            id="password"
            placeholder="Digitar senha"
          />
          <small>{error.password}</small>
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
