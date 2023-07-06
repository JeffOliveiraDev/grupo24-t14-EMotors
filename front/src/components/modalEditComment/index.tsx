import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../modalEditUser/styles.module.scss";
import { useForm } from "react-hook-form";
import { EditUserData, EditUserSchema } from "@/schemas/users.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPortal } from "react-dom";
import { apiEmotors } from "@/services/api";
import { parseCookies } from "nookies";

const ModalEditComment = ({ modalEdit, setModalEdit, commentToEdit }: any) => {
  // console.log(modalEdit);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const cookies = parseCookies();

  const token = cookies.token;

  const closeModal = () => {
    setModalEdit(false);
  };

  const onFormSubmit = (formData: any) => {
    apiEmotors
      .patch(`/comments/${commentToEdit}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Comentário atualizado com sucesso:", response.data);
        window.location.reload();
        closeModal();
      })
      .catch((error) => {
        console.error("Erro ao atualizar o comentário:", error);
      });
  };

  const handleEscapeKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKeyPress, false);

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress, false);
    };
  }, []);

  if (modalEdit) {
    return createPortal(
      <div
        className={`${styles.modal} ${modalEdit ? styles.open : ""}`}
        onClick={closeModal}
      >
        <div
          className={styles.modalInterior}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.tittleAndClose}>
            <h3>Editar texto</h3>
            <button onClick={() => setModalEdit(!modalEdit)}>X</button>
          </div>

          <form
            className={styles.formBox}
            onSubmit={handleSubmit(onFormSubmit)}
          >
            <div className={styles.box}>
              <label htmlFor="descricao">Seu texto</label>
              <textarea placeholder="Lorem Ipsum" {...register("text")} />
            </div>

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
  }
};
export default ModalEditComment;
