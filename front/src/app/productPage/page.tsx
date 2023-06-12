import React from "react";
import styles from "./styles.module.scss";
import headerTitle from "../assets/headerTitle.svg";
import Image from "next/image";

const ProductPage = () => {
  return (
    <header>
      <div className={styles.divLeft}>
        <Image src={headerTitle} alt="" />
      </div>
      <div className={styles.divRight}>
        <h3>Fazer Login</h3>
        <button>Cadastrar</button>
      </div>
    </header>
  );
};

export default ProductPage;
