"use client";
import { ProductPageContext } from "@/context/ProductPageContext";
import Image from "next/image";
import { useContext } from "react";
import styles from "./styles.module.scss";

const BoxImageCar = () => {
  const { userAnnounce } = useContext(ProductPageContext);
  return (
    <div className={styles.boxImgCar}>
      {userAnnounce ? (
        <Image src={userAnnounce.coverImage} width={312} height={152} alt="" />
      ) : null}
    </div>
  );
};

export default BoxImageCar;
