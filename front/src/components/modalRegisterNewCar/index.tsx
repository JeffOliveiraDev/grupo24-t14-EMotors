import React, { useState } from "react";
import styles from "../modalRegisterNewCar/styles.module.scss";
import { useForm } from "react-hook-form";
import {
  RegisterNewAnnounceData,
  registerNewAnnounceSchema,
} from "@/schemas/cars.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const ModalRegisterCar = ({ modalOpen, setModal }: any) => {
  const { register, handleSubmit } = useForm();
  // const { register, handleSubmit } = useForm<RegisterNewAnnounceData>({
  //   resolver: zodResolver(registerNewAnnounceSchema),
  // });

  const onFormSubmit = (formData: any) => {
    console.log(formData);
    formData.pfipe = !!formData.pfipe;
    formData.sellPrice = parseFloat(formData.sellPrice);

    handleCreateAnnounce(formData);
  };

  const [galleryFields, setGalleryFields] = useState([""]);

  const handleAddGalleryField = () => {
    setGalleryFields([...galleryFields, ""]);
  };

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQG1haWwuY29tIiwiaWF0IjoxNjg3OTU2NDIzLCJleHAiOjE2ODgwNDI4MjMsInN1YiI6IjdjYWMwMjJjLWY5NzItNDYyMC04ZDkzLWQ2OGMxZDc1ZDhiOSJ9.HUmHe1Cgplt-jHiJsoPC8axbhKXn9_W9F8eFs7bPkYQ";

  async function handleCreateAnnounce(formData: {
    model: string;
    fuel: string;
    mileage: string;
    color: string;
    pfipe: boolean;
    sellPrice: number;
    description: string;
    coverImage: string;
    detailsImage: string;
    testeerrror: string;
  }) {
    const url = "http://127.0.0.1:3001/announcements";
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQG1haWwuY29tIiwiaWF0IjoxNjg3OTU2NDIzLCJleHAiOjE2ODgwNDI4MjMsInN1YiI6IjdjYWMwMjJjLWY5NzItNDYyMC04ZDkzLWQ2OGMxZDc1ZDhiOSJ9.HUmHe1Cgplt-jHiJsoPC8axbhKXn9_W9F8eFs7bPkYQ";

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("Failed to create announcement");
      }

      const data = await response.json();
      console.log("Anúncio criado com sucesso!", data);
    } catch (error) {
      console.error("Erro ao criar o anúncio:", error);
    }
  }

  if (modalOpen) {
    return (
      <div className={styles.modalBox}>
        <div className={styles.modalInterior}>
          <div className={styles.tittleAndClose}>
            <h2>Criar anuncio</h2>
            <button onClick={() => setModal(!modalOpen)}>X</button>
          </div>
          <h3>Informações do veículo</h3>

          <form
            className={styles.formBox}
            onSubmit={handleSubmit(onFormSubmit)}
          >
            <div className={styles.boxMarca}>
              {/* <label htmlFor="marca">Marca</label>
              <input
                placeholder="Mercedes Benz"
                type="text"
                {...register("marca")}
              /> */}
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
                <input placeholder="2018" type="text" {...register("ano")} />
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
                  type="boolean"
                  {...register("pfipe")}
                />
              </div>
              <div className={styles.boxFlex}>
                <label htmlFor="preco">Preço</label>
                <input
                  placeholder="50.000 / Etanol"
                  type="number"
                  {...register("sellPrice")}
                />
              </div>
            </div>
            <h3>Descrição</h3>
            <textarea {...register("description")}></textarea>
            <label htmlFor="imagem de capa">Imagem de capa</label>
            <input
              placeholder="http://image.com"
              type="text"
              {...register("coverImage")}
            />
            <textarea {...register("detailsImage")}></textarea>
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
                onClick={() => setModal(!modalOpen)}
              >
                Cancelar
              </button>
              <button className={styles.btnCreate}>Criar anúncio</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default ModalRegisterCar;
