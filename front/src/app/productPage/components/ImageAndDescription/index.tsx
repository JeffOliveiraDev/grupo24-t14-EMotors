"use client";
import { ProductPageContext } from "@/context/ProductPageContext";
import Image from "next/image";
import { useContext } from "react";
import BoxImageCar from "../BoxImageCar";
import styles from "./styles.module.scss";
import Tag from "@/components/Tags/tags";

const ImageAndDescription = () => {
  const { userAnnounce, user } = useContext(ProductPageContext);
  return (
    <div className={styles.imgCarAndDescription}>
      <BoxImageCar />
      <div className={styles.carNamePrice}>
        {userAnnounce ? <h2>{userAnnounce.model}</h2> : null}
        <div className={styles.boxTagsPrice}>
          <ul>{userAnnounce && <Tag>{userAnnounce.color}</Tag>}</ul>
          <span>
            <strong>
              {userAnnounce ? `R$ ${userAnnounce.sellPrice}` : null}
            </strong>
          </span>
        </div>
        <a
          className={styles.btnBuy}
          href={`https://api.whatsapp.com/send?phone=+55+${user.telephone}&text=Ol%C3%A1%2C%20venho%20por%20meio%20do%20seu%20an%C3%BAncio%20na%20internet%2C%20gostaria%20de%20conhecer%20melhor%20seus%20produtos`}
        >
          Comprar
        </a>
      </div>
      <div className={styles.carDescription}>
        <h2>Descricão</h2>
        <p>{userAnnounce ? userAnnounce.description : null}</p>
      </div>
    </div>
  );
};

export default ImageAndDescription;
