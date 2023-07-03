"use-client";
import Link from "next/link";
import styles from "../FormLogin/styles.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SchemaLogin from "../../schema/index.schema";
import { toast } from "react-toastify";
import { z } from "zod";
import Input from "../../../../components/Input/loginModule";
import InputMask from "react-input-mask";

const FormLogin = () => {
  async function handleCreateAnnounce(data: any) {
    console.log(data);
    const url = `http://127.0.0.1:3001/login`;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      console.log("Logado com sucesso!", data);
      // window.location.reload();
      toast.success("Sucesso!");
    } catch (error) {
      console.error("Erro ao logar:", error);
    }
  }

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

      <form onSubmit={handleSubmit(handleCreateAnnounce)}>
        <div className={styles.firstInput}>
          <Input
            register={register("email")}
            name="email"
            type="text"
            id="email"
            placeholder="Digitar email"
            label="E-mail"
            error={error.email}
          />
        </div>
        <div>
          <Input
            register={register("password")}
            name="password"
            type="text"
            id="password"
            placeholder="Digitar senha"
            label="Senha"
            error={error.password}
          />
          <Link href="/recoverPassword">Esqueci minha senha</Link>
        </div>
        <button type="submit">Entrar</button>
        <span>Ainda não possui conta?</span>
        <Link href="/register">Cadastrar</Link>
      </form>
    </div>
  );
};

export default FormLogin;
