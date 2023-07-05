import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../ModalEditAdress/styles.module.scss";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { createPortal } from "react-dom";
import { apiEmotors } from "@/services/api";
import { EditAdressData, EditAdressSchema } from "@/schemas/editAdress.shema";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";

const ModalEditAdress = ({
  closeModal,

  userId,

  setModalEditDelete,
  editDeleteModal,
}: any) => {
  const { register, handleSubmit } = useForm();

  const [galleryFields, setGalleryFields] = useState([""]);

  const handleAddGalleryField = () => {
    setGalleryFields([...galleryFields, ""]);
  };

  const onFormSubmit = (formData: any) => {
    console.log(formData);
    formData.sellPrice = parseFloat(formData.sellPrice);

    handleCreateAdress(formData);
  };

  async function handleCreateAdress(formData: {
    cep: string;
    estado: string;
    cidade: string;
    rua: string;
    numero: string;
    complemento: string;
  }) {
    const cookies = parseCookies();

    const token = cookies.token;
    const url = `https://m6-emotors.onrender.com/users`;

    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("Failed to edit announcement");
      }

      const data = await response.json();
      console.log("Endereço editado com sucesso!", data);
      window.location.reload();
      toast.success("Sucesso!");
    } catch (error) {
      console.error("Erro ao editar o endereço:", error);
    }
  }
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

  if (!closeModal) {
    return (
      <div className={styles.modalBox}>
        <div className={styles.modalInterior}>
          <div className={styles.tittleAndClose}>
            <h2>Editar Endereço</h2>
            <button onClick={() => setModalEditDelete(closeModal)}>X</button>
          </div>
          <h3>Informações do veículo</h3>

          <form
            className={styles.formBox}
            onSubmit={handleSubmit(onFormSubmit)}
          >
            <div className={styles.box}>
              <label htmlFor="cep">CEP</label>
              <input placeholder="00000.000" type="text" {...register("cep")} />
            </div>
            <div className={styles.box}>
              <label htmlFor="estado">Estado</label>
              <input placeholder="Paraná" type="text" {...register("estado")} />
            </div>
            <div className={styles.box}>
              <label htmlFor="cidade">Cidade</label>
              <input
                placeholder="Curitiba"
                type="text"
                {...register("cidade")}
              />
            </div>
            <div className={styles.box}>
              <label htmlFor="rua">Rua</label>
              <input
                placeholder="Rua do paraná"
                type="text"
                {...register("rua")}
              />
            </div>
            <div className={styles.box}>
              <label htmlFor="numero">Número</label>
              <input placeholder="1525" type="text" {...register("numero")} />
            </div>
            <div className={styles.box}>
              <label htmlFor="complemento">Complemento</label>
              <input
                placeholder="Apart 12"
                type="text"
                {...register("complemento")}
              />
            </div>
            <div className={styles.boxBtnCancelCreate}>
              <button
                className={styles.btnCancel}
                onClick={() => {
                  closeModal(true), setModalEditDelete(false);
                }}
              >
                Exluir anúncio
              </button>
              <button className={styles.btnCreate}>Salvar alterações</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default ModalEditAdress;
