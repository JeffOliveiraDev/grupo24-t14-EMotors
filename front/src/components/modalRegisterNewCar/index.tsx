import React from "react";
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
  if (modalOpen) {
    return (
      <div className={styles.modalBox}>
        <div className={styles.modalInterior}>
          <div className={styles.tittleAndClose}>
            <h2>Criar anuncio</h2>
            <button onClick={() => setModal(!modalOpen)}>X</button>
          </div>
          <h3>Informações do veículo</h3>
          {/* action=""
            method="post"
            className={"p-4 flex flex-col gap-2"}
            onSubmit={handleSubmit(onFormSubmit)} */}
          <form action="" method="post" className={styles.formBox}>
            <div className={styles.boxMarcaModelo}>
              <label htmlFor="Marca">Marca</label>
              <input placeholder="Mercedes Benz" type="text" required />
              <label htmlFor="Marca">Modelo</label>
              <input placeholder="A 200 CGI" type="text" required />
            </div>
            <div className={styles.box}>
              <label htmlFor="Ano">Ano</label>
              <input placeholder="2018" type="text" required />

              <label htmlFor="Combustível">Combustível</label>
              <input placeholder="Gasolina / Etanol" type="text" required />
              <label htmlFor="Quilometragem">Quilometragem</label>
              <input placeholder="30.000" type="text" required />
              <label htmlFor="Cor">Cor</label>
              <input placeholder="Preto" type="text" required />

              <label htmlFor="Preço tabela FIPE">Preço tabela FIPE</label>
              <input placeholder="40.000 / Etanol" type="text" required />
              <label htmlFor="Preço">Preço</label>
              <input placeholder="50.000 / Etanol" type="text" required />
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default ModalRegisterCar;
