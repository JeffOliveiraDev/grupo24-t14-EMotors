import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../modalEditUser/styles.module.scss";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { createPortal } from "react-dom";
import { apiEmotors } from "@/services/api";
import { parseCookies } from "nookies";
import { EditAdressData, EditAdressSchema } from "@/schemas/editAdress.shema";

const ModalEditAdress = ({ modalOpen, setModalOpen }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditAdressData>({
    resolver: zodResolver(EditAdressSchema),
  });

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const cookies = parseCookies();
  const token = cookies.token;
  const userFromCookie = cookies.user ? JSON.parse(cookies.user) : null;
  const [user, setUser] = useState(userFromCookie);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleEscapeKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (!e.target.closest(`.${styles.modalInterior}`)) {
        closeModal();
      }
    };

    const handleEscapeKeyPress = (e: any) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick, false);
    document.addEventListener("keydown", handleEscapeKeyPress, false);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick, false);
      document.removeEventListener("keydown", handleEscapeKeyPress, false);
    };
  }, []);

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleOverlayClick = () => {
    closeModal();
  };

  function removerChavesVazias(objeto: { [key: string]: any }): {
    [key: string]: any;
  } {
    const novoObjeto = { ...objeto };

    Object.keys(novoObjeto).forEach((chave) => {
      if (novoObjeto[chave] === "") {
        delete novoObjeto[chave];
      }
    });

    return novoObjeto;
  }

  const onFormSubmit = (formData: EditAdressData) => {
    const data = { address: removerChavesVazias(formData) };
    console.log(formData);
    apiEmotors
      .patch("/users", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Endereço atualizado com sucesso:", response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error("Erro ao atualizar o endereço:", error);
      });
  };

  return createPortal(
    <div
      className={`${styles.modal} ${modalOpen ? styles.open : ""}`}
      onKeyDown={handleEscapeKeyPress}
    >
      <div className={styles.modalInterior} onClick={handleModalClick}>
        <div className={styles.tittleAndClose}>
          <h3>Editar Endereço</h3>
          <button type="button" onClick={closeModal}>
            X
          </button>
        </div>
        <div className={styles.title2}>
          <h3> Informações de Endereço</h3>
        </div>
        <form className={styles.formBox} onSubmit={handleSubmit(onFormSubmit)}>
          <div className={styles.box}>
            <label htmlFor="cep">CEP</label>
            <input placeholder="00000.000" type="text" {...register("cep")} />
          </div>
          <div className={styles.box}>
            <label htmlFor="estado">Estado</label>
            <input placeholder="Paraná" type="text" {...register("state")} />
          </div>
          <div className={styles.box}>
            <label htmlFor="cidade">Cidade</label>
            <input placeholder="Curitiba" type="text" {...register("city")} />
          </div>
          <div className={styles.box}>
            <label htmlFor="rua">Rua</label>
            <input
              placeholder="Rua do Paraná"
              type="text"
              {...register("street")}
            />
          </div>
          <div className={styles.box}>
            <label htmlFor="numero">Número</label>
            <input placeholder="851" type="text" {...register("homeNumber")} />
          </div>
          <div className={styles.box}>
            <label htmlFor="complemento">Complemento</label>
            <input
              placeholder="Apartamento 12"
              type="text"
              {...register("reference")}
            />
          </div>
          {/* {errors && (
            <p className={styles.error}>
              Erro(s) no preenchimento do formulário.
            </p>
          )} */}
          <div className={styles.buttonsGeral}>
            <button
              className={styles.buttonCancelar}
              type="button"
              onClick={closeModal}
            >
              Cancelar
            </button>
            <button className={styles.buttonSalvar} type="submit">
              Salvar Informações
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default ModalEditAdress;
