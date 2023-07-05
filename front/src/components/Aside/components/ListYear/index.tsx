"use client";
import { Context } from "@/context/HomeContext";
import { useContext } from "react";

const ListYear = () => {
  const { year, setchoosenYear } = useContext(Context);
  return (
    <ul>
      {year.map((year) => (
        <li key={year} onClick={() => setchoosenYear(year)}>
          {year}
        </li>
      ))}
    </ul>
  );
};

export default ListYear;
