import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../modalEditUser/styles.module.scss";
import { useForm } from "react-hook-form";
import { EditUserData, EditUserSchema } from "@/schemas/users.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPortal } from "react-dom";
import { apiEmotors } from "@/services/api";
import { parseCookies, setCookie } from "nookies";

const ModalEditUser = ({
  modalOpen,
  setModalOpen,
  setUserCookie,
}: {
  setUserCookie: React.Dispatch<React.SetStateAction<string>>;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserData>({
    resolver: zodResolver(EditUserSchema),
  });

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const cookies = parseCookies();
  const token = cookies.token;
  const userFromCookie = cookies.user ? JSON.parse(cookies.user) : null;
  const [user, setUser] = useState(userFromCookie);

  const closeModal = () => {
    setModalOpen(false);
  };

  function removerChavesVazias(objeto: { [key: string]: any }): {
    [key: string]: any;
  } {
    const novoObjeto = { ...objeto };

    Object.keys(novoObjeto).forEach((chave) => {
      if (novoObjeto[chave] === "") {
        delete novoObjeto[chave];
      }
    });

    return novoObjeto;
  }
  const onFormSubmit = (formData: EditUserData) => {
    const data = removerChavesVazias(formData);
    console.log(data);
    apiEmotors
      .patch("/users", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Usuário atualizado com sucesso:", response.data);
        setCookie(null, "user", JSON.stringify(response.data), {
          path: "/",
        });
        setUserCookie(JSON.stringify(response.data));
        closeModal();
      })
      .catch((error) => {
        console.error("Erro ao atualizar o usuário:", error);
      });
  };

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

  const deleteUser = () => {
    apiEmotors
      .delete("/users", { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        console.log("Usuário excluído com sucesso");
        closeModal();
      })
      .catch((error) => {
        console.error("Erro ao excluir o usuário:", error);
      });
  };

  const openConfirmDeleteModal = () => {
    setConfirmDeleteOpen(true);
  };

  const confirmDeleteModal = () => {
    if (!confirmDeleteOpen) {
      return null;
    }

    return (
      <div
        className={styles.confirmDeleteModal}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Confirmar Exclusão</h2>
        <p>Deseja realmente excluir o usuário?</p>
        <div className={styles.buttonsDeleteModal}>
          <button
            className={styles.buttonSalvar}
            type="button"
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button
            className={styles.buttonExcluir}
            type="button"
            onClick={deleteUser}
          >
            Excluir
          </button>
        </div>
      </div>
    );
  };

  return createPortal(
    <div
      className={`${styles.modal} ${modalOpen ? styles.open : ""}`}
      onClick={closeModal}
    >
      <div
        className={styles.modalInterior}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.tittleAndClose}>
          <h3>Editar Perfil</h3>
          <button onClick={() => setModalOpen(!modalOpen)}>X</button>
        </div>
        <div className={styles.title2}>
          <h3> Informações pessoais</h3>
        </div>
        <form className={styles.formBox} onSubmit={handleSubmit(onFormSubmit)}>
          <div className={styles.box}>
            <label htmlFor="nome">Nome</label>
            <input
              placeholder="Samuel Leão Silva"
              type="text"
              {...register("name")}
            />
          </div>
          <div className={styles.box}>
            <label htmlFor="email">Email</label>
            <input
              placeholder="samuel@kenzie.com.br"
              type="email"
              {...register("email")}
            />
          </div>
          <div className={styles.box}>
            <label htmlFor="cpf">CPF</label>
            <input
              placeholder="900.880.090-00"
              type="text"
              {...register("cpf")}
            />
          </div>
          <div className={styles.box}>
            <label htmlFor="celular">Celular</label>
            <input
              placeholder="(084) 90909-9092"
              type="text"
              {...register("telephone")}
            />
          </div>
          <div className={styles.box}>
            <label placeholder="09/12/99" htmlFor="dataDeNascimento">
              Data de Nascimento
            </label>
            <input type="date" {...register("birthDate")} />
          </div>
          <div className={styles.box}>
            <label htmlFor="descricao">Descrição</label>
            <textarea
              placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
              {...register("description")}
            />
          </div>
          {/* {errors && (
            <p className={styles.error}>
              Erro(s) no preenchimento do formulário.
            </p>
          )} */}
          <div className={styles.buttonsGeral}>
            <button
              className={styles.buttonCancelar}
              type="button"
              onClick={closeModal}
            >
              Cancelar
            </button>
            <button
              className={styles.buttonExcluir}
              type="button"
              onClick={openConfirmDeleteModal}
            >
              Excluir
            </button>
            <button className={styles.buttonSalvar} type="submit">
              Salvar Informações
            </button>
          </div>
        </form>
      </div>
      {confirmDeleteModal()}
    </div>,
    document.body
  );
};

export default ModalEditUser;
