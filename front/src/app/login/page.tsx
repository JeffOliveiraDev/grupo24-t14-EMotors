"use client";
import React from "react";
import Header from "@/components/Header/index.header";
import FormLogin from "./components/FormLogin/index.form.login";
import styles from "../login/styles.module.scss";
import Footer from "@/components/Footer/index.footer";

const loginPage = () => {
  return (
    <>
      <div className={styles.conteiner}>
        <Header />
        <FormLogin />
      </div>
      <Footer />
    </>
  );
};

export default loginPage;
