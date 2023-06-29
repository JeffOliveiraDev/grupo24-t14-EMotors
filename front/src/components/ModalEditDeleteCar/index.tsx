import React, { useState } from "react";
import styles from "../ModalEditDeleteCar/styles.module.scss";
import { useForm } from "react-hook-form";
import {
  RegisterNewAnnounceData,
  registerNewAnnounceSchema,
} from "@/schemas/cars.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const ModalEditDeleteCar = ({
  editDeleteModal,
  setModalEditDelete,
  announceId,
  setModalDelete,
}: any) => {
  const { register, handleSubmit } = useForm<RegisterNewAnnounceData>({
    resolver: zodResolver(registerNewAnnounceSchema),
  });
  console.log(announceId);
  const onFormSubmit = (formData: RegisterNewAnnounceData) => {
    console.log(formData);
  };

  const [selectedButton, setSelectedButton] = useState(true);
  const [galleryFields, setGalleryFields] = useState([""]);

  const handleAddGalleryField = () => {
    setGalleryFields([...galleryFields, ""]);
  };

  if (editDeleteModal) {
    return (
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
                placeholder="Mercedes Benz"
                type="text"
                // {...register("marca")}
              />
              <label htmlFor="modelo">Modelo</label>
              <input
                placeholder="A 200 CGI"
                type="text"
                {...register("model")}
              />
            </div>
            <div className={styles.boxDoubleCollum}>
              <div className={styles.boxFlex}>
                <label htmlFor="ano">Ano</label>
                <input
                  placeholder="2018"
                  type="text"
                  // {...register("ano")}
                />
              </div>
              <div className={styles.boxFlex}>
                <label htmlFor="Combustível">Combustível</label>
                <input
                  placeholder="Gasolina / Etanol"
                  type="text"
                  {...register("fuel")}
                />
              </div>
              <div className={styles.boxFlex}>
                <label htmlFor="quilometragem">Quilometragem</label>
                <input
                  placeholder="30.000"
                  type="text"
                  {...register("mileage")}
                />
              </div>
              <div className={styles.boxFlex}>
                <label htmlFor="cor">Cor</label>
                <input placeholder="Preto" type="text" {...register("color")} />
              </div>
              <div className={styles.boxFlex}>
                <label htmlFor="precoFipe">Preço tabela FIPE</label>
                <input
                  placeholder="40.000 / Etanol"
                  type="text"
                  {...register("pfipe")}
                />
              </div>
              <div className={styles.boxFlex}>
                <label htmlFor="preco">Preço</label>
                <input
                  placeholder="50.000 / Etanol"
                  type="text"
                  {...register("preco")}
                />
              </div>
            </div>
            <h3>Descrição</h3>
            <textarea {...register("descrição")}></textarea>
            <div>
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
              </div>
            </div>

            <label htmlFor="imagem de capa">Imagem de capa</label>
            <input
              placeholder="http://image.com"
              type="text"
              {...register("urlImagemCapa")}
            />
            <label htmlFor="primeira imagem da galeria">
              1ª Imagem da galeria
            </label>
            <input
              placeholder="http://image.com"
              type="text"
              {...register("primeiraImagemGaleria")}
            />

            {galleryFields.map((field, index) => (
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
            ))}

            <button
              className={styles.btnAddCampo}
              onClick={handleAddGalleryField}
            >
              Adicionar campo para imagem da galeria
            </button>
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
      </div>
    );
  }
};

export default ModalEditDeleteCar;
