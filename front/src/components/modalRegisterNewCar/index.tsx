import React, { useState } from "react";
import styles from "../modalRegisterNewCar/styles.module.scss";
import { useForm } from "react-hook-form";

const ModalRegisterCar = ({ modalOpen, setModal }: any) => {
  // const { register, handleSubmit } = useForm<UserData>({
  //   resolver: zodResolver(userSchema),
  // });

  // const { register: registerUser } = useAuth();

  // const onFormSubmit = (formData: UserData) => {
  //   registerUser(formData);
  // };
  const [galleryFields, setGalleryFields] = useState([""]); // Estado para controlar os campos de imagem da galeria

  const handleAddGalleryField = () => {
    setGalleryFields([...galleryFields, ""]); // Adicionar um novo campo vazio ao estado
  };

  if (modalOpen) {
    return (
      <div className={styles.modalBox}>
        <div className={styles.modalInterior}>
          <div className={styles.tittleAndClose}>
            <h2>Criar anuncio</h2>
            <button onClick={() => setModal(!modalOpen)}>X</button>
          </div>
          <h3>Informações do veículo</h3>

          <form action="" method="post" className={styles.formBox}>
            <div className={styles.boxMarca}>
              <label htmlFor="Marca">Marca</label>
              <input placeholder="Mercedes Benz" type="text" required />
              <label htmlFor="Marca">Modelo</label>
              <input placeholder="A 200 CGI" type="text" required />
            </div>
            <div className={styles.boxDoubleCollum}>
              <div className={styles.boxFlex}>
                <label htmlFor="Ano">Ano</label>
                <input placeholder="2018" type="text" required />
              </div>
              <div className={styles.boxFlex}>
                <label htmlFor="Combustível">Combustível</label>
                <input placeholder="Gasolina / Etanol" type="text" required />
              </div>
              <div className={styles.boxFlex}>
                <label htmlFor="Quilometragem">Quilometragem</label>
                <input placeholder="30.000" type="text" required />
              </div>
              <div className={styles.boxFlex}>
                <label htmlFor="Cor">Cor</label>
                <input placeholder="Preto" type="text" required />
              </div>
              <div className={styles.boxFlex}>
                <label htmlFor="Preço tabela FIPE">Preço tabela FIPE</label>
                <input placeholder="40.000 / Etanol" type="text" required />
              </div>
              <div className={styles.boxFlex}>
                <label htmlFor="Preço">Preço</label>
                <input placeholder="50.000 / Etanol" type="text" required />
              </div>
            </div>
            <h3>Descrição</h3>
            <textarea name="description"></textarea>
            <label htmlFor="imagem de capa">Imagem de capa</label>
            <input placeholder="http://image.com" type="url" required />
            <label htmlFor="primeira imagem da galeria">
              1ª Imagem da galeria
            </label>
            <input placeholder="http://image.com" type="url" required />

            {galleryFields.map((field, index) => (
              <div className={styles.newImageFields} key={index}>
                <label htmlFor={`imagem-galeria-${index + 1}`}>
                  {`${index + 2}ª Imagem da galeria`}
                </label>
                <input
                  placeholder="http://image.com"
                  type="url"
                  id={`imagem-galeria-${index + 1}`}
                  required
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
