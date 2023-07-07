"use client";
import { Context } from "@/context/HomeContext";
import { useContext } from "react";

const ListModels = () => {
  const { models, setFilter, setFilterType } = useContext(Context);

  return (
    <ul>
      {models.map((model) => (
        <li
          key={model}
          onClick={() => {
            setFilter(model), setFilterType("model");
          }}
        >
          {model}
        </li>
      ))}
    </ul>
  );
};

export default ListModels;
