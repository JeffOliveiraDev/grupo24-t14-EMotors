"use client";
import React, { createContext, useEffect, useState } from "react";
import { iannouncesPageContext } from "../interfaces";
import { parseCookies } from "nookies";
import { Users } from "@/interfaces";

const ContextAnnounces = createContext({} as iannouncesPageContext);

const ProviderAnnounces = ({ children }: { children: React.ReactNode }) => {
  const cookies = parseCookies();

  const [modalOpen, setModalOpen] = useState(false);
  const [editDeleteModal, setModalEditDelete] = useState(false);
  const [announces, setAnnounces] = useState<any>();
  const [announceId, setAnnounceId] = useState();
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedAnnounce, setSelectedAnnounce] = useState<any>({});
  const [detailedImage, setDetailedImage] = useState(false);
  const [user, setUser] = React.useState(JSON.parse(cookies.user));

  const token = cookies.token;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData(token);

        if (data.length > 0) {
          const filteredData = data.filter((item: any) =>
            user ? item.user.id === user.id : false
          );

          setAnnounces(filteredData);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [token, user]);

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

  const props = {
    modalOpen,
    setModalOpen,
    editDeleteModal,
    setModalEditDelete,
    announces,
    setAnnounces,
    announceId,
    setAnnounceId,
    modalDelete,
    setModalDelete,
    selectedAnnounce,
    setSelectedAnnounce,
    detailedImage,
    setDetailedImage,
    user,
  };

  return (
    <ContextAnnounces.Provider value={props}>
      {children}
    </ContextAnnounces.Provider>
  );
};

export { ContextAnnounces, ProviderAnnounces };
