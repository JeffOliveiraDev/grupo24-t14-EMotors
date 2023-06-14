"use client";
import Header from "@/components/Header/index.header";
import styles from "./styles.module.scss";
import Footer from "@/components/Footer/index.footer";
import Input from "../../components/Input/index.module";
import { useState } from "react";

const Register = () => {
  const [radio, setRadio] = useState("");

  return (
    <>
      <Header />
      <div className={styles.conteiner}>
        <form>
          <h2>Cadastro</h2>
          <div>
            <h3>Infomações pessoais</h3>
            <Input
              name="name"
              id="name"
              label="Nome"
              placeholder="Ex: Samuel Leão"
            />
            <Input
              label="Email"
              placeholder="Ex: samuel@kenzie.com.br"
              name="email"
              id="email"
            />
            <Input
              label="CPF"
              name="cpf"
              id="cpf"
              placeholder="000.000.000-00"
            />
            <Input
              name="telephone"
              id="tel"
              type="cel"
              label="Celular"
              placeholder="(DDD) 90000-0000"
            />
            <Input
              name="birthdate"
              placeholder="00/00/00"
              id="Date"
              type="date"
              label="Data de nascimento"
            />
            <Input
              name="description"
              label="Descrição"
              placeholder="Digitar descrição"
              id="description"
              textarea={true}
            />
            <h3>Infomações de endereço</h3>
            <Input name="cep" label="CEP" placeholder="00000.000" id="cep" />
            <div className={styles.double}>
              <Input
                name="estate"
                label="Estado"
                id="estate"
                placeholder="Digitar Estado"
              />
              <Input
                name="city"
                label="Cidade"
                id="city"
                placeholder="Digitar cidade"
              />
            </div>
            <Input
              name="street"
              label="Rua"
              id="street"
              placeholder="Digitar senha"
            />
            <div className={styles.double}>
              <Input
                name="number"
                label="Número"
                placeholder="Digitar número"
                id="number"
              />
              <Input
                name="complement"
                label="Complemento"
                placeholder="Ex: apart 307"
                id="complement"
              />
            </div>
            <h3>Tipo de conta</h3>
            <div className={styles.doubleLabel}>
              <Input
                type="radio"
                id="comprador"
                name="acoountType"
                value="comprador"
                label="Comprador"
                labelClass={
                  radio === "comprador"
                    ? styles.labeltBuyer
                    : styles.labelClassAdd
                }
                onChange={(e) => setRadio(e.target.value)}
              />
              <Input
                type="radio"
                id="anunciante"
                name="acoountType"
                value="anunciante"
                label="Anunciante"
                labelClass={
                  radio === "anunciante" ? styles.selectAdd : styles.labelClass
                }
                onChange={(e) => setRadio(e.target.value)}
              />
            </div>
            <Input
              name="password"
              label="Senha"
              id="password"
              type="password"
              placeholder="Digitar senha"
            />
            <Input
              name="confirmPassword"
              label="Confirmar Senha"
              id="confirmPassword"
              type="password"
              placeholder="Digitar senha"
            />
          </div>
        </form>
      </div>
      <Footer top="register" />
    </>
  );
};

export default Register;
