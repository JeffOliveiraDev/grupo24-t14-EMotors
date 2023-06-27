"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import carImage from "../../assets/imageCar.svg";
import headerTitle from "../../assets/headerTitle.svg";
import Tag from "@/components/Tags/tags";
import ModalRegisterCar from "@/components/modalRegisterNewCar";
import { AiOutlineMenu } from "react-icons/ai";

const AdminProfilePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [announces, setAnnounces] = useState<any>();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData();
        setAnnounces(data);
        console.log(data[0]);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQG1haWwuY29tIiwiaWF0IjoxNjg3ODA2NTgwLCJleHAiOjE2ODc4OTI5ODAsInN1YiI6IjdjYWMwMjJjLWY5NzItNDYyMC04ZDkzLWQ2OGMxZDc1ZDhiOSJ9.D3bIrW-V1CAWw6tJGgOqwNKOVzoCZgh7s4Ky_VmPLxI";

  async function getData() {
    const res = await fetch("http://127.0.0.1:3001/announcements", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }

  const tags = [{ text: "0Km" }, { text: "2023" }];
  return (
    <main className={styles.boxPage}>
      <header>
        <div className={styles.divLeft}>
          <Image src={headerTitle} alt="" />
        </div>
        <div className={styles.divRight}>
          <span>{announces[0].user.name.slice(0, 2).toUpperCase()}</span>
          <h3>{announces[0].user.name}</h3>
          <button className={styles.btnBurguer}>
            <AiOutlineMenu className={styles.burguerMenu} />
          </button>
        </div>
      </header>
      <div className={styles.blueBackground}></div>
      <section>
        <div className={styles.boxCreateAndList}>
          <div className={styles.boxUser}>
            <span>{announces[0].user.name.slice(0, 2).toUpperCase()}</span>

            <div className={styles.nameAndTag}>
              <h3>{announces[0].user.name}</h3>
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
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ModalRegisterCar modalOpen={modalOpen} setModal={setModalOpen} />
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
