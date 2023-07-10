import React, { useEffect, useState } from "react";
import styles from "../styles.module.scss";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import ImageAndDescription from "../components/ImageAndDescription";
import BoxPhotosAndUser from "../components/BoxPhotosAndUser";
import CommentSection from "../components/CommentSection";
import { ProductPageProvider } from "@/context/ProductPageContext";
import Form from "../components/Form";

const ProductPage = ({
  params,
}: {
  params: {
    announcementId: string;
  };
}) => {
  return (
    <ProductPageProvider>
      <div className={styles.allPage}>
        <Header />
        <section className={styles.sectionAnnounceAndSocial}>
          <div className={styles.boxAnnounceAndSocial}>
            <div className={styles.boxCarAndSocial}>
              <div className={styles.carAndSocial}>
                <div className={styles.ImgAndDescription}>
                  <ImageAndDescription />
                  <BoxPhotosAndUser />
                </div>
                <div className={styles.allSectionsComments}>
                  <CommentSection />
                  <Form />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer top="login" />
    </ProductPageProvider>
  );
};

export default ProductPage;
