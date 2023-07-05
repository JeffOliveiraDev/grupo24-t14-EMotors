"use client";
import { Context } from "@/context/HomeContext";
import { useContext } from "react";

const ListColors = () => {
  const { colors } = useContext(Context);
  return (
    <ul>
      {colors.map((color) => (
        <li key={color}>{color}</li>
      ))}
    </ul>
  );
};

export default ListColors;
