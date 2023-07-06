"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles.module.scss";
import listFotos from "../../../assets/listFhotos.svg";
import Image from "next/image";
import Tag from "@/components/Tags/tags";
import CommentItem from "@/components/CommentsItem/commentsItem";
import { apiEmotors } from "@/services/api";
import { Comments } from "@/interfaces";
import Header from "@/components/Header/header";
import { useForm } from "react-hook-form";
// import commentSchema from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Footer from "@/components/Footer/footer";
import { parseCookies } from "nookies";
import ModalDeleteComment from "@/components/ModalDeleteComment";

const ProductPage = ({
  params,
}: {
  params: {
    announcementId: string;
  };
}) => {
  const tags = [{ text: "0Km" }, { text: "2023" }];
  const [comments, setComments] = React.useState([] as Comments[]);
  const cookies = parseCookies();

  const token = cookies.token;
  const userFromCookie = cookies.user ? JSON.parse(cookies.user) : !null;
  const [user, setUser] = React.useState(userFromCookie);
  const [announce, setAnnounce] = useState<any>([]);
  const [userAnnounce, setUserAnnounce] = useState<any>();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData(token);

        {
          data
            ? setUserAnnounce(
                data.filter((item: any) => {
                  return item.id == params.announcementId;
                })
              )
            : null;
        }
        console.log(userAnnounce);

        if (params.announcementId == data[0].id) {
          setAnnounce(data[0]);
          return console.log(true);
        }
        console.log(announce);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [token]);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (formData: any) => {
    formData.sellPrice = parseFloat(formData.sellPrice);

    comment(formData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiEmotors.get(`/comments`, {
          params: {
            announcementId: params.announcementId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response);
        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [token, params]);

  const comment = async (data: any) => {
    try {
      const response = await apiEmotors.post<Comments>(
        `/comments/${params.announcementId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments((e) => [...e, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.allPage}>
        <Header />
        <section className={styles.sectionAnnounceAndSocial}>
          <div className={styles.boxAnnounceAndSocial}>
            <div className={styles.boxCarAndSocial}>
              <div className={styles.carAndSocial}>
                <div className={styles.ImgAndDescription}>
                  <div className={styles.imgCarAndDescription}>
                    <div className={styles.boxImgCar}>
                      <Image
                        src={announce.coverImage}
                        width={312}
                        height={152}
                        alt=""
                      />
                    </div>
                    <div className={styles.carNamePrice}>
                      {announce ? <h2>{announce.model}</h2> : null}
                      <div className={styles.boxTagsPrice}>
                        <ul>
                          <Tag>{`${announce.color} `}</Tag>

                          {/* {tags.map((e, i) => (
                            <Tag key={i}>{e.text}</Tag>
                          ))} */}
                        </ul>

                        <span>
                          <strong>
                            {announce ? `R$ ${announce.sellPrice}` : null}
                          </strong>
                        </span>
                      </div>
                      <a
                        className={styles.btnBuy}
                        href={`https://api.whatsapp.com/send?phone=+55+${user.telephone}&text=Ol%C3%A1%2C%20venho%20por%20meio%20do%20seu%20an%C3%BAncio%20na%20internet%2C%20gostaria%20de%20conhecer%20melhor%20seus%20produtos`}
                      >
                        Comprar
                      </a>
                    </div>
                    <div className={styles.carDescription}>
                      <h2>Descricão</h2>
                      <p>{announce.description}</p>
                    </div>
                  </div>
                  <div className={styles.boxPhotosAndUser}>
                    <div className={styles.photosAndUser}>
                      <h2>Fotos</h2>
                      <ul className={styles.photosList}>
                        <Image
                          src={announce.coverImage}
                          width={200}
                          height={200}
                          alt=""
                        />
                        <Image
                          src={announce.coverImage}
                          width={200}
                          height={200}
                          alt=""
                        />
                        <Image
                          src={announce.coverImage}
                          width={200}
                          height={200}
                          alt=""
                        />
                        <Image
                          src={announce.coverImage}
                          width={200}
                          height={200}
                          alt=""
                        />
                        <Image
                          src={announce.coverImage}
                          width={200}
                          height={200}
                          alt=""
                        />
                        <Image
                          src={announce.coverImage}
                          width={200}
                          height={200}
                          alt=""
                        />
                      </ul>
                    </div>
                  </div>
                </div>
                <div className={styles.allSectionsComments}>
                  <div className={styles.commentsSection}>
                    <h2>Comentários</h2>
                    <ul className={styles.commentsList}>
                      {comments.map((e, i) => (
                        <CommentItem comments={e} key={i} />
                      ))}
                    </ul>
                  </div>
                  <form
                    onSubmit={handleSubmit(onFormSubmit)}
                    className={styles.commentBox}
                  >
                    <div className={styles.commentArea}>
                      <div className={styles.textareaWrapper}>
                        <div className={styles.comment}>
                          <span>
                            <span>
                              {user.name[0].toUpperCase() +
                                user.name[1].toUpperCase()}
                            </span>
                          </span>
                          <h3>{user.name}</h3>
                        </div>
                        <textarea
                          {...register("text")}
                          name="text"
                          placeholder="Carro muito confortável, foi uma ótima experiência de compra..."
                        ></textarea>
                        <span>{errors.name?.message?.toString()}</span>
                        <button className={styles.submitButtonEnabled}>
                          Enviar
                        </button>
                      </div>
                      <div className={styles.tags}>
                        <button className={styles.tagButton}>
                          Gostei Muito!
                        </button>
                        <button className={styles.tagButton}>Incrível</button>
                        <button type="submit" className={styles.tagButton}>
                          Recomendarei para meus amigos!
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer top="login" />
    </>
  );
};

export default ProductPage;
