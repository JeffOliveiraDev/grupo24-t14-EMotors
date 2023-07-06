import React, { useState } from "react";
import styles from "../ModalDelete/styles.module.scss";
import { useForm } from "react-hook-form";
import {
  RegisterNewAnnounceData,
  registerNewAnnounceSchema,
} from "@/schemas/cars.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";

const ModalDeleteComment = ({
  modalDelete,
  setModalDelete,
  commentId,
}: any) => {
  console.log(commentId);
  const cookies = parseCookies();

  const token = cookies.token;

  const closeModal = () => {
    setModalDelete(false);
  };

  const handleDeleteComment = () => {
    fetch(`https://m6-emotors.onrender.com/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Comentário excluído com sucesso!", data);
        toast.success("Comentário Exluido!");
        closeModal();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Erro ao excluir o comentário:", error);
      });
  };

  if (modalDelete) {
    return (
      <div className={styles.modalBox}>
        <div className={styles.modalInterior}>
          <div className={styles.tittleAndClose}>
            <h2>Excluir comentário</h2>
            <button onClick={() => setModalDelete(!modalDelete)}>X</button>
          </div>
          <h2>Tem certeza que deseja remover esse comentário?</h2>
          <p>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente seu
            comentário de nossos servidores.
          </p>
          <div className={styles.boxBtnCancelDelete}>
            <button
              className={styles.btnCancel}
              onClick={() => setModalDelete(!modalDelete)}
            >
              Cancelar
            </button>
            <button
              className={styles.btnConfirmDelete}
              onClick={() => handleDeleteComment()}
            >
              Sim, excluir comentário
            </button>
          </div>

          <form className={styles.formBox}></form>
        </div>
      </div>
    );
  }
};

export default ModalDeleteComment;
