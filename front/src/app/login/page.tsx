import React from "react";
import Header from "@/components/Header/index.header";
import FormLogin from "./components/FormLogin/index.form.login";
import styles from "../login/styles.module.scss";

const loginPage = () => {
  return (
    <div className={styles.conteiner}>
      <Header />
      <FormLogin />
    </div>
  );
};

export default loginPage;
