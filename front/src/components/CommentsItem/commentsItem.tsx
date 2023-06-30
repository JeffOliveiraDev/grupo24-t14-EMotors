"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { apiEmotors } from "@/services/api";
import { Comments } from "@/interfaces";

const CommentItem = ({ comments }: { comments: Comments }) => {
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
        <h4>{calcularDiasCriacao(newCreatedAt)}</h4>
      </div>
      <p>{comments.text}</p>
    </li>
  );
};

export default CommentItem;
