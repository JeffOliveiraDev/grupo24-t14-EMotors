"use client";
import { Context } from "@/context/HomeContext";
import { useContext, useEffect, useState } from "react";

const ListCarsBrands = () => {
  const { carsBrands, setFilter, setFilterType } = useContext(Context);

  return (
    <ul>
      {carsBrands.map((brand) => (
        <li
          key={brand}
          onClick={() => {
            setFilter(brand), setFilterType("brand");
          }}
        >
          {brand}
        </li>
      ))}
    </ul>
  );
};

export default ListCarsBrands;
