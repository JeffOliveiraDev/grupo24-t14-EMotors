"use client";
import React, { useState, useEffect, useReducer, createContext } from "react";
import { ContextAuth } from "../interfaces";

const Context = createContext({} as ContextAuth);

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [carsBrands, setCarsBrands] = useState<string[]>([]);
  const [brand, setBrand] = useState("chevrolet");
  const [year, setYear] = useState([]);
  const [choosenYear, setchoosenYear] = useState();
  const [filterClear, setClearFilter] = useState(false);

  if (filterClear) {
    window.location.reload();
    setClearFilter(false);
  }

  const models = [
    "Civic",
    "Corolla",
    "Cruze",
    "Fit",
    "Gol",
    "Ka",
    "Onix",
    "Porsche 718",
  ];
  const colors = ["Azul", "Branca", "Cinza", "Prata", "Preta", "Verde"];
  const fuels = ["Diesel", "Etanol", "Gasolina", "Flex"];

  async function getData() {
    const res = await fetch(
      "https://kenzie-kars.herokuapp.com/cars?brand=chevrolet"
    );

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }

  async function getBrand() {
    const res = await fetch("https://kenzie-kars.herokuapp.com/cars");

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const dataBrand = await getBrand();
        const data = await getData();
        const years = data.map((car: { year: any }) => {
          return car.year;
        });

        const uniqueYears = years.filter(
          (year: any, index: any, arr: string | any[]) =>
            arr.indexOf(year) === index
        );

        const brandNames = Object.keys(dataBrand);

        setYear(uniqueYears);
        setCarsBrands(brandNames);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const props = {
    setchoosenYear,
    getBrand,
    models,
    colors,
    fuels,
    setBrand,
    brand,
    carsBrands,
    year,
    setYear,
    choosenYear,
    filterClear,
    setClearFilter,
  };

  return <Context.Provider value={props}>{children}</Context.Provider>;
};

export { Context, Provider };
