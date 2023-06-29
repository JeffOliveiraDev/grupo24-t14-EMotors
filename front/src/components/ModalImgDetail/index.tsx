import React, { useState } from "react";
import styles from "../ModalImgDetail/styles.module.scss";
import { toast } from "react-toastify";
import Image from "next/image";

const ModalImgDetail = ({
  detailedImage,
  setDetailedImage,
  selectedAnnounce,
}: any) => {
  console.log(selectedAnnounce);
  if (detailedImage) {
    return (
      <div className={styles.modalBox}>
        <div className={styles.modalInterior}>
          <div className={styles.tittleAndClose}>
            <h2>Imagem do Veículo</h2>

            <button onClick={() => setDetailedImage(!detailedImage)}>X</button>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src={selectedAnnounce.coverImage}
              width={800}
              height={500}
              alt=""
              className={styles.modalImage}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default ModalImgDetail;
