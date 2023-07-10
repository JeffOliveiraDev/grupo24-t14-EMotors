"use client";
import { Context } from "@/context/HomeContext";
import { useContext } from "react";

const ListColors = () => {
  const { colors, setFilter, setFilterType } = useContext(Context);

  return (
    <ul>
      {colors.map((color) => (
        <li
          key={color}
          onClick={() => {
            setFilter(color), setFilterType("color");
          }}
        >
          {color}
        </li>
      ))}
    </ul>
  );
};

export default ListColors;
