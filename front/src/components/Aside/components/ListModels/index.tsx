"use client";
import { Context } from "@/context/HomeContext";
import { useContext } from "react";

const ListModels = () => {
  const { models } = useContext(Context);
  return (
    <ul>
      {models.map((model) => (
        <li key={model}>{model}</li>
      ))}
    </ul>
  );
};

export default ListModels;
