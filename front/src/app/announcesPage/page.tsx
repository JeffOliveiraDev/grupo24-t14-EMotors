"use client";

import React, { use, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import headerTitle from "../../assets/headerTitle.svg";
import Tag from "@/components/Tags/tags";
import ModalRegisterCar from "@/components/modalRegisterNewCar";
import { AiOutlineMenu } from "react-icons/ai";
import ModalEditDeleteCar from "@/components/ModalEditDeleteCar";
import ModalDelete from "@/components/ModalDelete";
import ModalImgDetail from "@/components/ModalImgDetail";
import Header from "@/components/Header/header";
import { parseCookies } from "nookies";
import nookies from "nookies";

const AdminProfilePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editDeleteModal, setModalEditDelete] = useState(false);
  const [announces, setAnnounces] = useState<any>();
  const [announceId, setAnnounceId] = useState();
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedAnnounce, setSelectedAnnounce] = useState(null);
  const [detailedImage, setDetailedImage] = useState(false);
  const cookies = parseCookies();

  const token = cookies.token;
  const [user, setUser] = React.useState(JSON.parse(cookies.user));

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData(token);

        if (data.length > 0) {
          const userId = user.id;
          const filteredData = data.filter(
            (item: any) => item.user.id === userId
          );
          setAnnounces(filteredData);
          console.log(filteredData);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [token, user.id]);

  async function getData(token: string) {
    const res = await fetch("https://m6-emotors.onrender.com/announcements", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }

  const tags = [{ text: "0Km" }, { text: "2023" }];
  return (
    <main className={`${styles.boxPage} ${styles.scroolBar}`}>
      <Header />
      <div className={styles.blueBackground}></div>
      <section>
        <div className={styles.boxCreateAndList}>
          <div className={styles.boxUser}>
            <span>{user.name.slice(0, 2).toUpperCase()}</span>

            <div className={styles.nameAndTag}>
              <h3>{user.name}</h3>
              <Tag>Anunciante</Tag>
            </div>
            <p>{user.description ? user.description : null}</p>
            {user ? (
              <button
                className={styles.btnCreateAnnounce}
                onClick={() => setModalOpen(!modalOpen)}
              >
                Criar Anuncio
              </button>
            ) : null}
          </div>

          <div className={styles.boxMyCarsList}>
            <h2>Anúncios</h2>
            <ul>
              {announces?.map((announce: any) => (
                <li className={styles.cardStyle} key={announce.id}>
                  <Image
                    src={announce.coverImage}
                    width={312}
                    height={152}
                    alt=""
                    onClick={() => {
                      setDetailedImage(!detailedImage),
                        setSelectedAnnounce(announce);
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
                        <strong>
                          R$ {announce.sellPrice.toLocaleString()}
                        </strong>
                      </h3>
                    </ul>
                  </div>
                  <div className={styles.boxBtnsEditDetails}>
                    <button
                      onClick={() => {
                        setModalEditDelete(!editDeleteModal),
                          setAnnounceId(announce.id);
                        setSelectedAnnounce(announce);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        setDetailedImage(!detailedImage),
                          setSelectedAnnounce(announce);
                      }}
                    >
                      Ver detalhes
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ModalEditDeleteCar
          editDeleteModal={editDeleteModal}
          setModalEditDelete={setModalEditDelete}
          announceId={announceId}
          modalDelete={modalDelete}
          setModalDelete={setModalDelete}
          selectedAnnounce={selectedAnnounce}
        />
        <ModalRegisterCar modalOpen={modalOpen} setModal={setModalOpen} />
        <ModalDelete
          modalDelete={modalDelete}
          setModalDelete={setModalDelete}
          announceId={announceId}
        />
        <ModalImgDetail
          detailedImage={detailedImage}
          setDetailedImage={setDetailedImage}
          selectedAnnounce={selectedAnnounce}
        />
      </section>
      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <h3>Motors</h3>
          <h4>shop</h4>
        </div>
        <div className={styles.center}>
          <h4>@2022 - Todos os direitos reservados</h4>
        </div>
        <div className={styles.footerRight}>
          <button className={styles.btnFooter}>^</button>
        </div>
      </footer>
    </main>
  );
};
export default AdminProfilePage;
