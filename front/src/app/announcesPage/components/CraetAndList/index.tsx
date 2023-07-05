"use client";
import styles from "./styles.module.scss";
import React, { useContext } from "react";
import Tag from "@/components/Tags/tags";
import { ContextAnnounces } from "@/context/announcesPage";

const CraeteAndList = () => {
  const { user, setModalOpen } = useContext(ContextAnnounces);

  return (
    <div className={styles.boxUser}>
      {user && (
        <React.Fragment>
          <span>{user.name.slice(0, 2).toUpperCase()}</span>

          <div className={styles.nameAndTag}>
            <h3>{user.name}</h3>
            <Tag>Anunciante</Tag>
          </div>
          <p>{user.description ? user.description : null}</p>
        </React.Fragment>
      )}

      {user ? (
        <button
          className={styles.btnCreateAnnounce}
          onClick={() => setModalOpen((e) => !e)}
        >
          Criar Anuncio
        </button>
      ) : null}
    </div>
  );
};

export default CraeteAndList;
