import React from "react";
import styles from "./styles.module.scss";
import headerTitle from "../../assets/headerTitle.svg";
import mercedezA200 from "../../assets/MercedesBenzA200.svg";
import listFotos from "../../assets/listFhotos.svg";
import Image from "next/image";
import Tag from "@/components/Tags/index.tags";

const ProductPage = () => {
  const tags = [{ text: "0Km" }, { text: "2023" }];
  return (
    <>
      <header className={styles.header}>
        <div className={styles.divLeft}>
          <Image src={headerTitle} alt="" />
        </div>
        <div className={styles.divRight}>
          <h3>Fazer Login</h3>
          <button>Cadastrar</button>
        </div>
      </header>
      <span className={styles.backgroundBlue}> </span>
      <span className={styles.backgroundGrey}></span>
      <section className={styles.sectionAnnounceAndSocial}>
        <div className={styles.boxAnnounceAndSocial}>
          <div className={styles.boxCarAndSocial}>
            <div className={styles.carAndSocial}>
              <div className={styles.boxImgCar}>
                <Image src={mercedezA200} alt="" />
              </div>
              <div className={styles.carNamePrice}>
                <h2>
                  Mercedes Benz A 200 CGI ADVANCE SEDAN Mercedes Benz A 200{" "}
                </h2>
                <div className={styles.boxTagsPrice}>
                  <ul>
                    {tags.map((e, i) => (
                      <Tag key={i}>{e.text}</Tag>
                    ))}
                  </ul>

                  <span>
                    <strong>R$ 00.000,00</strong>
                  </span>
                </div>
                <button className={styles.btnBuy}>Comprar</button>
              </div>
              <div className={styles.carDescription}>
                <h2>Descrição</h2>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Sunt, nesciunt! Non distinctio sunt odio, animi id dolorem
                  recusandae rem, ipsa nisi, praesentium eum corporis ullam
                  veniam quis earum ea asperiores!
                </p>
              </div>
              <div className={styles.commentsSection}>
                <h2>Comentários</h2>
                <ul className={styles.commentsList}>
                  <li className={styles.liComment}>
                    <div className={styles.comment}>
                      <span>CL</span>
                      <h3>Júlia</h3>
                      <h5></h5>
                      <h4>há 3 dias</h4>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quo ipsam tenetur facere enim dignissimos voluptas illum,
                      hic sit, asperiores consequuntur culpa architecto autem
                      pariatur quas quibusdam! Cupiditate itaque distinctio
                      beatae.
                    </p>
                  </li>
                  <li className={styles.liComment}>
                    <div className={styles.comment}>
                      <span>CL</span>
                      <h3>Júlia</h3>
                      <h5></h5>
                      <h4>há 3 dias</h4>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quo ipsam tenetur facere enim dignissimos voluptas illum,
                      hic sit, asperiores consequuntur culpa architecto autem
                      pariatur quas quibusdam! Cupiditate itaque distinctio
                      beatae.
                    </p>
                  </li>
                </ul>
              </div>
              <div className={styles.commentBox}>
                <div className={styles.commentArea}>
                  <div className={styles.textareaWrapper}>
                    <div className={styles.comment}>
                      <span>CL</span>
                      <h3>Júlia</h3>
                    </div>

                    <textarea placeholder="Carro muito confortável, foi uma ótima experiência de compra..."></textarea>
                    <button className={styles.submitButtonEnabled}>
                      Enviar
                    </button>
                  </div>
                  <div className={styles.tags}>
                    <button className={styles.tagButton}>Gostei Muito!</button>
                    <button className={styles.tagButton}>Incrível</button>
                    <button className={styles.tagButton}>
                      Recomendarei para meus amigos!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.boxPhotosAndUser}>
            <div className={styles.photosAndUser}>
              <h2>Fotos</h2>
              <ul className={styles.photosList}>
                <Image src={listFotos} alt="" />
                <Image src={listFotos} alt="" />
                <Image src={listFotos} alt="" />
                <Image src={listFotos} alt="" />
                <Image src={listFotos} alt="" />
                <Image src={listFotos} alt="" />
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductPage;
