import Header from "@/components/Header/header";
import styles from "./styles.module.scss";
import Footer from "@/components/Footer/footer";
import FormRegister from "@/components/FormRegister";

const Register = () => {
  return (
    <main>
      <Header />
      <div className={styles.conteiner}>
        <FormRegister />
      </div>
      <Footer top="register" />
    </main>
  );
};

export default Register;
