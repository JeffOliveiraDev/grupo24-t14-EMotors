"use client";
import React, { useContext, useState } from "react";
import styles from "../ModalEditDeleteCar/styles.module.scss";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { parseCookies } from "nookies";
import { ContextAnnounces } from "@/context/announcesPage";
import { createPortal } from "react-dom";

const ModalEditDeleteCar = () => {
  const { register, handleSubmit } = useForm();
  const {
    editDeleteModal,
    setModalEditDelete,
    announceId,
    setModalDelete,
    selectedAnnounce,
  } = useContext(ContextAnnounces);

  const [selectedButton, setSelectedButton] = useState(true);
  const [galleryFields, setGalleryFields] = useState([""]);

  const handleAddGalleryField = () => {
    setGalleryFields([...galleryFields, ""]);
  };

  const onFormSubmit = (formData: any) => {
    console.log(formData);
    formData.sellPrice = parseFloat(formData.sellPrice);

    handleCreateAnnounce(formData);
  };

  async function handleCreateAnnounce(formData: {
    model: string;
    brand: string;
    fuel: string;
    mileage: string;
    color: string;
    pfipe: string;
    sellPrice: number;
    description: string;
    coverImage: string;
    detailsImage: string;
  }) {
    const cookies = parseCookies();

    const token = cookies.token;
    const url = `https://m6-emotors.onrender.com/announcements/${announceId}`;

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
      console.log("Anúncio editado com sucesso!", data);
      window.location.reload();
      toast.success("Sucesso!");
    } catch (error) {
      console.error("Erro ao editar o anúncio:", error);
    }
  }

  return (
    editDeleteModal &&
    createPortal(
      <div className={styles.modalBox}>
        <div className={styles.modalInterior}>
          <div className={styles.tittleAndClose}>
            <h2>Editar anúncio</h2>
            <button onClick={() => setModalEditDelete(!editDeleteModal)}>
              X
            </button>
          </div>
          <h3>Informações do veículo</h3>

          <form
            className={styles.formBox}
            onSubmit={handleSubmit(onFormSubmit)}
          >
            <div className={styles.boxMarca}>
              <label htmlFor="marca">Marca</label>
              <input
                defaultValue={selectedAnnounce?.brand?.toString()}
                placeholder="Mercedes Benz"
                type="text"
                {...register("brand")}
              />
              <label htmlFor="modelo">Modelo</label>
              <input
                defaultValue={selectedAnnounce?.model}
                placeholder="A 200 CGI"
                type="text"
                {...register("model")}
              />
            </div>
            <div className={styles.boxDoubleCollum}>
              {/* <div className={styles.boxFlex}>
                <label htmlFor="ano">Ano</label>
                <input
                  placeholder="2018"
                  type="text"
                  // {...register("ano")}
                />
              </div> */}
              <div className={styles.boxFlex}>
                <label htmlFor="Combustível">Combustível</label>
                <input
                  defaultValue={selectedAnnounce.fuel}
                  placeholder="Gasolina / Etanol"
                  type="text"
                  {...register("fuel")}
                />
              </div>
              <div className={styles.boxFlex}>
                <label htmlFor="quilometragem">Quilometragem</label>
                <input
                  defaultValue={selectedAnnounce.mileage}
                  placeholder="30.000"
                  type="text"
                  {...register("mileage")}
                />
              </div>
              <div className={styles.boxFlex}>
                <label htmlFor="cor">Cor</label>
                <input
                  placeholder="Preto"
                  defaultValue={selectedAnnounce.color}
                  type="text"
                  {...register("color")}
                />
              </div>
              <div className={styles.boxFlex}>
                <label htmlFor="precoFipe">Preço tabela FIPE</label>
                <input
                  placeholder="10.000"
                  type="text"
                  defaultValue={selectedAnnounce.pfipe}
                  {...register("pfipe")}
                />
                {/* <input
                  placeholder="true/false"
                  type="text"
                  defaultValue={selectedAnnounce.pfipe}
                  {...register("pfipe")}
                /> */}
              </div>
              <div className={styles.boxFlex}>
                <label htmlFor="preco">Preço</label>
                <input
                  placeholder="50.000 / Etanol"
                  type="text"
                  defaultValue={selectedAnnounce.sellPrice}
                  {...register("sellPrice")}
                />
              </div>
            </div>
            <h3>Descrição</h3>
            <textarea
              {...register("description")}
              defaultValue={selectedAnnounce.description}
            ></textarea>
            {/* <div>
              <h3>Publicado</h3>
              <div className={styles.btnsPublishedAnnounce}>
                <button
                  className={`${styles.yesBtn} ${
                    selectedButton === true ? styles.selected : ""
                  }`}
                  onClick={() => setSelectedButton(true)}
                >
                  Sim
                </button>
                <button
                  className={`${styles.noBtn} ${
                    selectedButton === false ? styles.selected : ""
                  }`}
                  onClick={() => setSelectedButton(false)}
                >
                  Não
                </button>
              </div> */}
            {/* </div> */}

            <label htmlFor="imagem de capa">Imagem de capa</label>
            <input
              placeholder="http://image.com"
              type="text"
              {...register("coverImage")}
              defaultValue={selectedAnnounce.coverImage}
            />
            {/* <label htmlFor="primeira imagem da galeria">
              1ª Imagem da galeria
            </label>
            <input
              placeholder="http://image.com"
              type="text"
              {...register("primeiraImagemGaleria")}
            /> */}

            {/* {galleryFields.map((field, index) => (
              <div className={styles.newImageFields} key={index}>
                <label htmlFor={`imagem-galeria-${index + 1}`}>
                  {`${index + 2}ª Imagem da galeria`}
                </label>
                <input
                  placeholder="http://image.com"
                  type="text"
                  id={`imagem-galeria-${index + 1}`}
                  {...register(`imagensGaleria.${index}`)}
                />
              </div>
            ))} */}

            {/* <button
              className={styles.btnAddCampo}
              onClick={handleAddGalleryField}
            >
              Adicionar campo para imagem da galeria
            </button> */}
            <div className={styles.boxBtnCancelCreate}>
              <button
                className={styles.btnCancel}
                onClick={() => {
                  setModalDelete(true), setModalEditDelete(false);
                }}
              >
                Exluir anúncio
              </button>
              <button className={styles.btnCreate}>Salvar alterações</button>
            </div>
          </form>
        </div>
      </div>,
      document.body
    )
  );
};

export default ModalEditDeleteCar;
