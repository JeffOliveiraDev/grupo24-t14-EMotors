"use client";
import Tag from "@/components/Tags/tags";
import { ContextAnnounces } from "@/context/announcesPage";
import Image from "next/image";
import { useContext } from "react";
import styles from "./styles.module.scss";

const AnnouncesCard = ({ announce }: any) => {
  const {
    setDetailedImage,
    detailedImage,
    setModalEditDelete,
    setSelectedAnnounce,
    setAnnounceId,
  } = useContext(ContextAnnounces);

  return (
    <li className={styles.cardStyle}>
      <Image
        src={announce.coverImage}
        width={312}
        height={152}
        alt=""
        onClick={() => {
          setDetailedImage(!detailedImage), setSelectedAnnounce(announce);
        }}
      />

      <h3>{announce.brand}</h3>

      <p>{announce.description}</p>

      <div className={styles.userNameLogo}>
        <span>{announce.user.name.slice(0, 2).toUpperCase()}</span>
        <h3>{announce.user.name}</h3>
      </div>

      <div className={styles.boxTagsPrice}>
        <ul>
          <div className={styles.tags}>
            <Tag key={announce.mileage}>{announce.mileage}</Tag>
            <Tag key={announce.fuel}>{announce.fuel}</Tag>
          </div>
          <h3>
            <strong>R$ {announce.sellPrice.toLocaleString()}</strong>
          </h3>
        </ul>
      </div>
      <div className={styles.boxBtnsEditDetails}>
        <button
          onClick={() => {
            setModalEditDelete((e) => !e), setAnnounceId(announce.id);
            setSelectedAnnounce(announce);
          }}
        >
          Editar
        </button>
        <button
          onClick={() => {
            setDetailedImage(!detailedImage), setSelectedAnnounce(announce);
          }}
        >
          Ver detalhes
        </button>
      </div>
    </li>
  );
};

export default AnnouncesCard;
