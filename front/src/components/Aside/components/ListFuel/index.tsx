"use client";
import { Context } from "@/context/HomeContext";
import { useContext } from "react";

const ListFuel = () => {
  const { fuels, setFilter, setFilterType } = useContext(Context);

  return (
    <ul>
      {fuels.map((fuel) => (
        <li
          key={fuel}
          onClick={() => {
            setFilter(fuel), setFilterType("fuel");
          }}
        >
          {fuel}
        </li>
      ))}
    </ul>
  );
};

export default ListFuel;
