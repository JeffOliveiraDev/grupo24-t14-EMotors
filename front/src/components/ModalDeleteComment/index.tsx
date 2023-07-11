import React, { useContext, useState } from "react";
import styles from "../ModalDeleteComment/styles.module.scss";
import { useForm } from "react-hook-form";
import {
  RegisterNewAnnounceData,
  registerNewAnnounceSchema,
} from "@/schemas/cars.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import { createPortal } from "react-dom";
import { apiEmotors } from "@/services/api";
import { ProductPageContext } from "@/context/ProductPageContext";

const ModalDeleteComment = ({
  modalDelete,
  setModalDelete,
  commentId,
}: any) => {
  const { setComments, comments } = useContext(ProductPageContext);
  const cookies = parseCookies();

  const token = cookies.token;

  const closeModal = () => {
    setModalDelete(false);
  };

  const removeIten = (id: string) => {
    const filtered = comments.filter((e) => e.id !== id);
    setComments(filtered);
  };

  const handleDeleteComment = async () => {
    try {
      await apiEmotors.delete(`/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      closeModal();
      removeIten(commentId + "");
      toast.success("Comentário excluído com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir o comentário");
    }
  };

  if (modalDelete) {
    return createPortal(
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
      </div>,
      document.body
    );
  }
};

export default ModalDeleteComment;
