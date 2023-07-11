import React, { useState } from "react";
import styles from "../ModalDelete/styles.module.scss";
import { useForm } from "react-hook-form";
import {
  RegisterNewAnnounceData,
  registerNewAnnounceSchema,
} from "@/schemas/cars.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseCookies } from "nookies";
import { createPortal } from "react-dom";
import { apiEmotors } from "@/services/api";
import { toast } from "react-toastify";

const ModalDelete = ({ modalDelete, setModalDelete, announceId }: any) => {
  const cookies = parseCookies();

  const token = cookies.token;

  const handleDeleteAnnounce = () => {
    try {
      apiEmotors.delete(`/announcements/${announceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Excluido com sucesso!");
    } catch (err) {
      toast.error("Error ao excluir!");
      console.log(err);
    }
  };

  if (modalDelete) {
    return createPortal(
      <div className={styles.modalBox}>
        <div className={styles.modalInterior}>
          <div className={styles.tittleAndClose}>
            <h2>Excluir anúncio</h2>
            <button onClick={() => setModalDelete(!modalDelete)}>X</button>
          </div>
          <h2>Tem certeza que deseja remover esse anúncio?</h2>
          <p>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente sua
            conta e removerá seus dados de nossos servidores.
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
              onClick={() => handleDeleteAnnounce()}
            >
              Sim, excluir anúncio
            </button>
          </div>

          <form className={styles.formBox}></form>
        </div>
      </div>,
      document.body
    );
  }
};

export default ModalDelete;
