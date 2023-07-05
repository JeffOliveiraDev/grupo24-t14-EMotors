import React, { useState, useRef, useEffect } from "react";
import styles from "./styles.module.scss";
import ModalEditUser from "@/components/modalEditUser";
import ModalEditAdress from "@/components/modaleditAdress";

const TagUser = ({ name }: { name: string | null }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAdressOpen, setModalAdressOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
    setMenuOpen(false);
  };
  const openAdressModal = () => {
    setModalAdressOpen(true);
    setMenuOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div
      className={styles.tagUser}
      onClick={() => setMenuOpen((state) => !state)}
    >
      <div className={styles.menu}>
        <span className={styles.span}>
          {name && name[0].toUpperCase() + name[1].toUpperCase()}
        </span>
        <p className={styles.p}>{name && name}</p>
      </div>
      {menuOpen && (
        <div className={styles.menuContainer}>
          <ul className={styles.menuUl}>
            <li onClick={openModal} className={styles.menuItem}>
              Editar perfil
            </li>
            <li className={styles.menuItem} onClick={openAdressModal}>
              Editar endereço
            </li>
            <li
              className={styles.menuItem}
              to="/"
              onClick={() => localStorage.clear()}
            >
              Sair
            </li>
          </ul>
        </div>
      )}
      {modalOpen && (
        <ModalEditUser modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
      {modalAdressOpen && (
        <ModalEditAdress
          modalOpen={modalAdressOpen}
          setModalOpen={setModalAdressOpen}
        />
      )}
    </div>
  );
};

export default TagUser;
