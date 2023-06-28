import React, { useState } from "react";
import styles from "../ModalDelete/styles.module.scss";
import { useForm } from "react-hook-form";
import {
  RegisterNewAnnounceData,
  registerNewAnnounceSchema,
} from "@/schemas/cars.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const ModalDelete = ({ modalDelete, setModalDelete, announceId }: any) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQG1haWwuY29tIiwiaWF0IjoxNjg3OTAwNDc5LCJleHAiOjE2ODc5ODY4NzksInN1YiI6IjdjYWMwMjJjLWY5NzItNDYyMC04ZDkzLWQ2OGMxZDc1ZDhiOSJ9.-kmyy-4SwBCCxW1-A9n_TiGNrYXradjYW4jXPJyRHvw";

  const handleDeleteAnnounce = () => {
    fetch(`http://127.0.0.1:3001/announcements/${announceId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Anúncio excluído com sucesso!", data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Erro ao excluir o anúncio:", error);
      });
  };

  if (modalDelete) {
    return (
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
      </div>
    );
  }
};

export default ModalDelete;
