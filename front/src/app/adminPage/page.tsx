"use client";

import React, { useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import carImage from "../../assets/imageCar.svg";
import headerTitle from "../../assets/headerTitle.svg";
import Tag from "@/components/Tags/tags";
import ModalRegisterCar from "@/components/modalRegisterNewCar";
import { AiOutlineMenu } from "react-icons/Ai";

const AdminProfilePage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const tags = [{ text: "0Km" }, { text: "2023" }];
  return (
    <main className={styles.boxPage}>
      <header>
        <div className={styles.divLeft}>
          <Image src={headerTitle} alt="" />
        </div>
        <div className={styles.divRight}>
          <span>CL</span>
          <h3>Samuel</h3>
          <button className={styles.btnBurguer}>
            <AiOutlineMenu className={styles.burguerMenu} />
          </button>
        </div>
      </header>
      <div className={styles.blueBackground}></div>
      <section>
        <div className={styles.boxCreateAndList}>
          <div className={styles.boxUser}>
            <span>SL</span>
            <div className={styles.nameAndTag}>
              <h2>Samuel</h2>
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
              <li>
                <Image src={carImage} alt="" />
                <h3>carro</h3>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem...
                </p>
                <div className={styles.boxTagsPrice}>
                  <ul>
                    {tags.map((e, i) => (
                      <Tag key={i}>{e.text}</Tag>
                    ))}
                  </ul>
                </div>
              </li>
              <li>
                <Image src={carImage} alt="" />
                <h3>carro</h3>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem...
                </p>
                <div className={styles.boxTagsPrice}>
                  <ul>
                    {tags.map((e, i) => (
                      <Tag key={i}>{e.text}</Tag>
                    ))}
                  </ul>
                </div>
              </li>
              <li>
                <Image src={carImage} alt="" />
                <h3>carro</h3>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem...
                </p>
                <div className={styles.boxTagsPrice}>
                  <ul>
                    {tags.map((e, i) => (
                      <Tag key={i}>{e.text}</Tag>
                    ))}
                  </ul>
                </div>
              </li>
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
