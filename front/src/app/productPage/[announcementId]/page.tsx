"use client";
import React, { useEffect } from "react";
import styles from "../styles.module.scss";
import headerTitle from "../../../assets/headerTitle.svg";
import mercedezA200 from "../../../assets/MercedesBenzA200.svg";
import listFotos from "../../../assets/listFhotos.svg";
import Image from "next/image";
import Tag from "@/components/Tags/tags";
import CommentItem from "@/components/CommentsItem/commentsItem";
import { apiEmotors } from "@/services/api";
import { Comments } from "@/interfaces";
import Header from "@/components/Header/header";
import { useForm } from "react-hook-form";
import commentSchema from "./scehma";
import { zodResolver } from "@hookform/resolvers/zod";
import Footer from "@/components/Footer/footer";

const ProductPage = ({
  params,
}: {
  params: {
    announcementId: string;
  };
}) => {
  const tags = [{ text: "0Km" }, { text: "2023" }];
  const [comments, setComments] = React.useState([] as Comments[]);

  const user = JSON.parse(localStorage.getItem("user")!);
  const token = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(commentSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiEmotors.get<Comments[]>(`/comments`, {
          params: {
            announcementId: params.announcementId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
                      <Image src={mercedezA200} alt="" />
                    </div>
                    <div className={styles.carNamePrice}>
                      <h2>
                        Mercedes Benz A 200 CGI ADVANCE SEDAN Mercedes Benz A
                        200{" "}
                      </h2>
                      <div className={styles.boxTagsPrice}>
                        <ul>
                          {tags.map((e, i) => (
                            <Tag key={i}>{e.text}</Tag>
                          ))}
                        </ul>

                        <span>
                          <strong>R$ 0000000</strong>
                        </span>
                      </div>
                      <button className={styles.btnBuy}>Comprar</button>
                    </div>
                    <div className={styles.carDescription}>
                      <h2>Descrição</h2>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
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
                    onSubmit={handleSubmit(comment)}
                    className={styles.commentBox}
                  >
                    <div className={styles.commentArea}>
                      <div className={styles.textareaWrapper}>
                        <div className={styles.comment}>
                          <span>
                            {user.name[0].toUpperCase() +
                              user.name[1].toUpperCase()}
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
      <Footer />
    </>
  );
};

export default ProductPage;
