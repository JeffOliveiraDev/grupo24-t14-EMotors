"use client";
import React from "react";
import Header from "@/components/Header/header";
import FormLogin from "./components/FormLogin/index.form.login";
import styles from "../login/styles.module.scss";
import Footer from "@/components/Footer/footer";
import InputMask from "react-input-mask";

const loginPage = () => {
  return (
    <>
      <Header />

      <div className={styles.conteiner}>
        <FormLogin />
      </div>
      <Footer top="login" />
    </>
  );
};

export default loginPage;
