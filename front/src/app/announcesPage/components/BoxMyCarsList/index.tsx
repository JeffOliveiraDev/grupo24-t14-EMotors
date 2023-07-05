"use client";
import Image from "next/image";
import styles from "./styles.module.scss";
import { useContext } from "react";
import { ContextAnnounces } from "@/context/announcesPage";
import Tag from "@/components/Tags/tags";
import AnnouncesCard from "../announcesCard";

const BoxMyCarList = () => {
  const {
    announces,
    setDetailedImage,
    detailedImage,
    setModalEditDelete,
    setSelectedAnnounce,
    setAnnounceId,
  } = useContext(ContextAnnounces);

  return (
    <div className={styles.boxMyCarsList}>
      <h2>Anúncios</h2>
      <ul>
        {announces?.map((announce: any) => (
          <AnnouncesCard key={announce.id} announce={announce} />
        ))}
      </ul>
    </div>
  );
};

export default BoxMyCarList;
