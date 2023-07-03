import Link from "next/link";
import styles from "../FormLogin/styles.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SchemaLogin from "../../schema/index.schema";
import { toast, ToastContainer } from "react-toastify";
import Input from "../../../../components/Input/loginModule";
import { apiEmotors } from "@/services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { setCookie } from "nookies";

const FormLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SchemaLogin),
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const create = async (data: any) => {
    try {
      setLoading((e) => !e);
      const res = await apiEmotors.post("/login", data);
      setCookie(null, "token", res.data.token, {
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
      const get = await apiEmotors.get(`/users/${res.data.user_id}`);
      setCookie(null, "user", JSON.stringify(get.data), {
        path: "/",
      });
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 3000,
      });
      router.push("/");
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      setLoading((e) => !e);
    }
  };

  const error = {
    email: errors.email?.message?.toString(),
    password: errors.password?.message?.toString(),
  };

  return (
    <>
      <ToastContainer />
      <main className={styles.conteiner}>
        <h3>Login</h3>
        <form onSubmit={handleSubmit(create)}>
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
              type="password"
              id="password"
              placeholder="Digitar senha"
              label="Senha"
              error={error.password}
            />
            <Link href="/recoverPassword">Esqueci minha senha</Link>
          </div>
          <button type="submit">
            {!loading ? "Entrar" : <AiOutlineLoading3Quarters />}
          </button>
          <span>Ainda não possui conta?</span>
          <Link href="/register">Cadastrar-se</Link>
        </form>
      </main>
    </>
  );
};

export default FormLogin;
