"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { apiEmotors } from "@/services/api";
import { Comments } from "@/interfaces";
import { parseCookies } from "nookies";
import React from "react";
import ModalDeleteComment from "../ModalDeleteComment";
import ModalEditComment from "../modalEditComment";

const CommentItem = ({ comments }: { comments: Comments }) => {
  const cookies = parseCookies();

  const token = cookies.token;
  const userFromCookie = cookies.user ? JSON.parse(cookies.user) : null;
  const [user, setUser] = React.useState(userFromCookie);
  const [modalDelete, setModalDelete] = useState(false);
  const [commentToDelete, setCommentTodelete] = useState<string>();
  const [modalEdit, setModalEdit] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState<string>();

  const newCreatedAt = new Date(comments.createdAt);

  function calcularDiasCriacao(dataCriacao: Date) {
    // Converte a data de criação em milissegundos
    const dataCriacaoMs = new Date(dataCriacao).getTime();

    // Obtém a data atual em milissegundos
    const dataAtualMs = new Date().getTime();

    // Calcula a diferença em milissegundos
    const diferencaMs = dataAtualMs - dataCriacaoMs;

    // Converte a diferença em dias
    const diferencaDias = Math.floor(diferencaMs / (1000 * 60 * 60 * 24));

    return diferencaDias;
  }

  return (
    <li className={styles.liComment}>
      <div className={styles.comment}>
        <span>
          {comments.user?.name[0].toUpperCase() +
            comments.user?.name[1].toUpperCase()}
        </span>
        <h3>{comments.user?.name}</h3>
        <h5></h5>
        <h4>
          {calcularDiasCriacao(newCreatedAt) == 0
            ? "hoje"
            : calcularDiasCriacao(newCreatedAt)}
        </h4>
      </div>
      <p>{comments.text}</p>
      <div className={styles.btnEditDelete}>
        {comments.user.id === user.id ? (
          <button
            key={comments.id}
            className={styles.btnDelete}
            onClick={() => {
              setModalDelete(!modalDelete), setCommentTodelete(comments.id);
            }}
          >
            Exluir
          </button>
        ) : null}
        {comments.user.id === user.id ? (
          <button
            className={styles.btnEdit}
            onClick={() => {
              setModalEdit(!modalEdit), setCommentToEdit(comments.id);
            }}
          >
            Editar
          </button>
        ) : null}
        <ModalDeleteComment
          modalDelete={modalDelete}
          setModalDelete={setModalDelete}
          commentId={commentToDelete}
        />
        <ModalEditComment
          modalEdit={modalEdit}
          setModalEdit={setModalEdit}
          commentToEdit={commentToEdit}
        />
      </div>
    </li>
  );
};

export default CommentItem;
