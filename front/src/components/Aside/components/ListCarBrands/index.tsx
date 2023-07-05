"use client";
import { Context } from "@/context/HomeContext";
import { useContext, useEffect, useState } from "react";

const ListCarsBrands = () => {
  const { brand, setBrand, carsBrands } = useContext(Context);

  return (
    <ul>
      {carsBrands.map((brand) => (
        <li key={brand} onClick={() => setBrand(brand)}>
          {brand}
        </li>
      ))}
    </ul>
  );
};

export default ListCarsBrands;
