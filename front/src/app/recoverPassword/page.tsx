"use client";
import Header from "@/components/Header/header";
import Input from "@/components/Input/loginModule";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import SchemaLogin from "../login/schema/index.schema";
import styles from "./styles.module.scss";
import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer/footer";

function RecoverPassword() {
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
  };

  return (
    <>
      <Header />
      <div className={styles.box}>
        <div className={styles.conteiner}>
          <h3>Recuperar Senhar</h3>

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

            <button type="submit">Enviar</button>
          </form>
        </div>
        <Footer top="recoverPassword" />
      </div>
    </>
  );
}

export default RecoverPassword;
