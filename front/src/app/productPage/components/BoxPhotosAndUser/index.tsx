"use client";
import { ProductPageContext } from "@/context/ProductPageContext";
import Image from "next/image";
import { useContext } from "react";
import styles from "./styles.module.scss";

const BoxPhotosAndUser = () => {
  const { userAnnounce } = useContext(ProductPageContext);

  return (
    <div className={styles.boxPhotosAndUser}>
      <div className={styles.photosAndUser}>
        <h2>Fotos</h2>
        <ul className={styles.photosList}>
          {userAnnounce ? (
            <Image
              src={userAnnounce.coverImage}
              width={200}
              height={200}
              alt=""
            />
          ) : null}
          {userAnnounce ? (
            <Image
              src={userAnnounce.coverImage}
              width={200}
              height={200}
              alt=""
            />
          ) : null}

          {userAnnounce ? (
            <Image
              src={userAnnounce.coverImage}
              width={200}
              height={200}
              alt=""
            />
          ) : null}

          {userAnnounce ? (
            <Image
              src={userAnnounce.coverImage}
              width={200}
              height={200}
              alt=""
            />
          ) : null}

          {userAnnounce ? (
            <Image
              src={userAnnounce.coverImage}
              width={200}
              height={200}
              alt=""
            />
          ) : null}

          {userAnnounce ? (
            <Image
              src={userAnnounce.coverImage}
              width={200}
              height={200}
              alt=""
            />
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default BoxPhotosAndUser;
