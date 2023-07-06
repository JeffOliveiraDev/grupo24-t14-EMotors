import React, { useState, useRef, useEffect } from "react";
import styles from "./styles.module.scss";
import ModalEditUser from "@/components/modalEditUser";
import ModalEditAdress from "@/components/modaleditAdress";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useRouter } from "next/navigation";

const TagUser = ({ name }: { name: string | null }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalAdressOpen, setModalAdressOpen] = useState(false);
  const router = useRouter();
  const nookies = parseCookies();
  const [userCookie, setUserCookie] = useState(nookies.user);

  name = JSON.parse(userCookie).name;

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
            {userCookie && JSON.parse(userCookie).acoountType && (
              <li
                className={styles.menuItem}
                onClick={() => router.push("/announcesPage")}
              >
                Meus Anúncios
              </li>
            )}
            <li
              className={styles.menuItem}
              onClick={() => {
                destroyCookie(null, "token");
                destroyCookie(null, "user");
                router.push("/login");
              }}
            >
              Sair
            </li>
          </ul>
        </div>
      )}
      {modalOpen && (
        <ModalEditUser
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setUserCookie={setUserCookie}
        />
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
