"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import headerTitle from "../../assets/headerTitle.svg";
import Tag from "@/components/Tags/tags";
import ModalRegisterCar from "@/components/modalRegisterNewCar";
import { AiOutlineMenu } from "react-icons/ai";
import ModalEditDeleteCar from "@/components/ModalEditDeleteCar";
import ModalDelete from "@/components/ModalDelete";
import ModalImgDetail from "@/components/ModalImgDetail";

const AdminProfilePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editDeleteModal, setModalEditDelete] = useState(false);
  const [announces, setAnnounces] = useState<any>();
  const [announceId, setAnnounceId] = useState();
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedAnnounce, setSelectedAnnounce] = useState(null);
  const [detailedImage, setDetailedImage] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQG1haWwuY29tIiwiaWF0IjoxNjg4MzgzOTU3LCJleHAiOjE2ODg0NzAzNTcsInN1YiI6IjFmNzlkZjM5LTg2YjctNDhjOC1iN2U4LTU4OGQ1YTc4ZjhmMCJ9.QOwkXTWE6Wi55sUwO74a7TMFADkHN8QW6jYNtWjen7g";
        const data = await getData(token);
        console.log(data);
        console.log(data[0].user);
        if (data.length > 0) {
          const userId = data[0].user.id;
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
  }, []);

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

  return (
    <main className={`${styles.boxPage} ${styles.scroolBar}`}>
      <header>
        <div className={styles.divLeft}>
          <Image src={headerTitle} alt="" />
        </div>
        <div className={styles.divRight}>
          <span>{announces?.[0]?.user?.name?.slice(0, 2).toUpperCase()}</span>
          <h3>{announces?.[0]?.user?.name}</h3>
          <button className={styles.btnBurguer}>
            <AiOutlineMenu className={styles.burguerMenu} />
          </button>
        </div>
      </header>
      <div className={styles.blueBackground}></div>
      <section>
        <div className={styles.boxCreateAndList}>
          <div className={styles.boxUser}>
            <span>{announces?.[0]?.user?.name?.slice(0, 2).toUpperCase()}</span>

            <div className={styles.nameAndTag}>
              <h3>{announces?.[0]?.user?.name}</h3>
              <Tag>Anunciante</Tag>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem aliquid doloremque obcaecati explicabo laboriosam
              libero quidem expedita cum. Qui quia obcaecati quae odio
              cupiditate, ea eos inventore facere tenetur ex.
            </p>
            <button
              className={styles.btnCreateAnnounce}
              onClick={() => setModalOpen(!modalOpen)}
            >
              Criar Anuncio
            </button>
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

                  <h3>{announce.model}</h3>

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
