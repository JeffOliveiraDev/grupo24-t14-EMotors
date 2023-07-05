import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import ModalRegisterCar from "@/components/modalRegisterNewCar";
import ModalEditDeleteCar from "@/components/ModalEditDeleteCar";
import ModalDelete from "@/components/ModalDelete";
import ModalImgDetail from "@/components/ModalImgDetail";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import { ProviderAnnounces } from "@/context/announcesPage";
import CraeteAndList from "./components/CraetAndList";
import BoxMyCarList from "./components/BoxMyCarsList";

const AdminProfilePage = () => {
  return (
    <ProviderAnnounces>
      <Header id="top" />
      <main className={`${styles.boxPage} ${styles.scroolBar}`}>
        <div className={styles.blueBackground}></div>
        <section>
          <div className={styles.boxCreateAndList}>
            <CraeteAndList />
            <BoxMyCarList />
            <ModalEditDeleteCar />
            <ModalRegisterCar />
            <ModalDelete />
            <ModalImgDetail />
          </div>
        </section>
      </main>
      <Footer top="announcesPage" />
    </ProviderAnnounces>
  );
};
export default AdminProfilePage;
