"use client";
import { createContext, useEffect, useState } from "react";
import { ContextProduct } from "../interfaces";
import { Comments } from "@/interfaces";
import { apiEmotors } from "@/services/api";
import { parseCookies } from "nookies";
import React from "react";
import { useParams } from "next/navigation";
import { request } from "axios";
import { ToastContainer } from "react-toastify";

const ProductPageContext = createContext({} as ContextProduct);

const ProductPageProvider = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();

  const tags = [{ text: "0Km" }, { text: "2023" }];
  const [comments, setComments] = React.useState([] as Comments[]);
  const cookies = parseCookies();

  const token = cookies.token;
  const userFromCookie = cookies.user ? JSON.parse(cookies.user) : !null;
  const [user, setUser] = React.useState(userFromCookie);
  const [announce, setAnnounce] = useState<any>([]);
  const [userAnnounce, setUserAnnounce] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();

        const filteredData = data.filter(
          (item: any) => item.id === params.announcementId
        );

        setUserAnnounce(filteredData[0]);

        if (params.announcementId === data[0].id) {
          setAnnounce(data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token, params]);

  async function getData() {
    const res = await fetch("https://m6-emotors.onrender.com/announcements");

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }

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
      return;
    }
  };

  const onFormSubmit = (formData: any) => {
    formData.sellPrice = parseFloat(formData.sellPrice);

    comment(formData);
  };

  const announcementId = params.announcementId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiEmotors.get(`/comments`, {
          params: {
            announcementId: announcementId,
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
  }, [token, announcementId]);

  return (
    <>
      <ToastContainer />
      <ProductPageContext.Provider
        value={{
          user,
          setUser,
          setUserAnnounce,
          setAnnounce,
          comment,
          getData,
          tags,
          userFromCookie,
          announce,
          userAnnounce,
          onFormSubmit,
          comments,
          setComments,
        }}
      >
        {children}
      </ProductPageContext.Provider>
    </>
  );
};

export { ProductPageContext, ProductPageProvider };
