"use client";
import { Context } from "@/context/HomeContext";
import { useContext } from "react";

const ListFuel = () => {
  const { fuels } = useContext(Context);
  return (
    <ul>
      {fuels.map((fuel) => (
        <li key={fuel}>{fuel}</li>
      ))}
    </ul>
  );
};

export default ListFuel;
