"use client";
import { Context } from "@/context/HomeContext";
import { useContext } from "react";

const ListYear = () => {
  const { year } = useContext(Context);
  // onClick={() => setchoosenYear(year)}
  return (
    <ul>
      {year.map((year) => (
        <li key={year}>{year}</li>
      ))}
    </ul>
  );
};

export default ListYear;
