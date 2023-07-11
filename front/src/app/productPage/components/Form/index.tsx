"use client";
import { ProductPageContext } from "@/context/ProductPageContext";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";

const Form = () => {
  const { onFormSubmit, user } = useContext(ProductPageContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className={styles.commentBox}>
      <div className={styles.commentArea}>
        <div className={styles.textareaWrapper}>
          <div className={styles.comment}>
            <span>
              {user?.name?.toString()[0]?.toUpperCase() +
                user?.name?.toString()[0]?.toUpperCase()}
            </span>
            <h3>{user?.name?.toString()}</h3>
          </div>
          <textarea
            {...register("text")}
            name="text"
            placeholder="Carro muito confortável, foi uma ótima experiência de compra..."
          ></textarea>
          <span>{errors.name?.message?.toString()}</span>
          <button className={styles.submitButtonEnabled}>Enviar</button>
        </div>
        <div className={styles.tags}>
          <button className={styles.tagButton}>Gostei Muito!</button>
          <button className={styles.tagButton}>Incrível</button>
          <button type="submit" className={styles.tagButton}>
            Recomendarei para meus amigos!
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
