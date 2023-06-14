"use client";
import Header from "@/components/Header/index.header";
import styles from "./styles.module.scss";
import Footer from "@/components/Footer/index.footer";
import Input from "../../components/Input/index.module";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registeSchemaComplet } from "./schema";

const Register = () => {
  const [radio, setRadio] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registeSchemaComplet),
  });

  const error = {
    name: errors.name?.message?.toString(),
    email: errors.email?.message?.toString(),
    cpf: errors.cpf?.message?.toString(),
    telephone: errors.telephone?.message?.toString(),
    birthDate: errors.birthDate?.message?.toString(),
    description: errors.description?.message?.toString(),
    password: errors.password?.message?.toString(),
    acoountType: errors.acoountType?.message?.toString(),
    cep: errors.cep?.message?.toString(),
    street: errors.street?.message?.toString(),
    city: errors.city?.message?.toString(),
    state: errors.state?.message?.toString(),
    number: errors.number?.message?.toString(),
    reference: errors.reference?.message?.toString(),
    confirmPassword: errors.confirmPassword?.message?.toString(),
  };
  const registerUser = (data: any) => {
    console.log(error);
    console.log(errors);

    data.acoountType = radio;
    if (!data.acoountType) {
      data.acoountType = "comprador";
    }
    console.log(data);
  };

  return (
    <>
      <Header />
      <div className={styles.conteiner}>
        <form onSubmit={handleSubmit(registerUser)}>
          <h2>Cadastro</h2>
          <div>
            <h3>Infomações pessoais</h3>
            <Input
              register={register("name")}
              name="name"
              error={error.name}
              id="name"
              label="Nome"
              placeholder="Ex: Samuel Leão"
            />
            <Input
              register={register("email")}
              label="Email"
              error={error.email}
              placeholder="Ex: samuel@kenzie.com.br"
              name="email"
              id="email"
            />
            <Input
              inputMask={true}
              mask="999.999.999-99"
              register={register("cpf")}
              error={error.cpf}
              label="CPF"
              name="cpf"
              id="cpf"
              placeholder="000.000.000-00"
            />
            <Input
              inputMask={true}
              mask="(99)99999-9999"
              register={register("telephone")}
              error={error.telephone}
              name="telephone"
              id="tel"
              type="cel"
              label="Celular"
              placeholder="(DDD) 90000-0000"
            />
            <Input
              inputMask={true}
              mask="99/99/9999"
              register={register("birthDate")}
              name="birthDate"
              error={error.birthDate}
              placeholder="00/00/00"
              id="Date"
              label="Data de nascimento"
            />
            <Input
              register={register("description")}
              name="description"
              error={error.description}
              label="Descrição"
              placeholder="Digitar descrição"
              id="description"
              textarea={true}
            />
            <h3>Infomações de endereço</h3>
            <Input
              inputMask={true}
              mask="99999-999"
              register={register("cep")}
              error={error.cep}
              name="cep"
              label="CEP"
              placeholder="00000-000"
              id="cep"
            />
            <div className={styles.double}>
              <Input
                register={register("state")}
                error={error.state}
                name="state"
                label="Estado"
                id="state"
                placeholder="Digitar Estado"
              />
              <Input
                register={register("city")}
                error={error.city}
                name="city"
                label="Cidade"
                id="city"
                placeholder="Digitar cidade"
              />
            </div>
            <Input
              register={register("street")}
              error={error.street}
              name="street"
              label="Rua"
              id="street"
              placeholder="Digitar senha"
            />
            <div className={styles.double}>
              <Input
                register={register("homeNumber")}
                error={error.number}
                name="homeNumber"
                label="Número"
                placeholder="Digitar número"
                id="number"
              />
              <Input
                register={register("reference")}
                error={error.reference}
                name="reference"
                label="Complemento"
                placeholder="Ex: apart 307"
                id="complement"
              />
            </div>
            <h3>Tipo de conta</h3>
            <div className={styles.doubleLabel}>
              <Input
                register={register("acoountType")}
                name="acoountType"
                type="radio"
                id="comprador"
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
                register={register("acoountType")}
                name="acoountType"
                type="radio"
                id="anunciante"
                value="anunciante"
                label="Anunciante"
                error={error.acoountType}
                labelClass={
                  radio === "anunciante" ? styles.selectAdd : styles.labelClass
                }
                onChange={(e) => setRadio(e.target.value)}
              />
            </div>
            <Input
              error={error.password}
              name="password"
              label="Senha"
              id="password"
              type="text"
              register={register("password")}
              placeholder="Digitar senha"
            />
            <Input
              error={
                error.confirmPassword
                  ? error.confirmPassword
                  : errors[""]?.message?.toString()
              }
              register={register("confirmPassword")}
              name="confirmPassword"
              label="Confirmar Senha"
              id="confirmPassword"
              type="text"
              placeholder="Digitar senha"
            />
            <button type="submit">Finalizar cadastro</button>
          </div>
        </form>
      </div>
      <Footer top="register" />
    </>
  );
};

export default Register;
