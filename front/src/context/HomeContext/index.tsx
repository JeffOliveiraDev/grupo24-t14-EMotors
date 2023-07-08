"use client";
import React, { useState, useEffect, useReducer, createContext } from "react";
import { iHomePageContext } from "../interfaces";

const Context = createContext({} as iHomePageContext);

const Provider = ({ children }: { children: React.ReactNode }) => {
  // const [carsBrands, setCarsBrands] = useState<string[]>([]);
  const [brand, setBrand] = useState<string[]>([]);
  const [years, setYear] = useState([]);
  const [choosenYear, setchoosenYear] = useState();
  const [filterClear, setClearFilter] = useState(false);
  const [filter, setFilter] = useState<any>();
  const [filterType, setFilterType] = useState<any>();
  // const [models, setModels] = useState<string[]>([]);
  const [getBrand, setGetBrand] = useState();

  const [km, setKm] = useState<string[]>([]);
  const [price, setPrice] = useState<string[]>([]);

  if (filterClear) {
    window.location.reload();
    setClearFilter(false);
  }

  const year = [2022, 2021, 2020, 2019];
  const models = [
    "Chevrolet Onix",
    "Hyundai HB20",
    "Ford Ka",
    "Volkswagen Gol",
    "Fiat Strada",
    "Fiat Argo",
    "Volkswagen T-Cross",
    "Fiat Toro",
    "Jeep Renegade",
    "Toyota Corolla",
  ];

  const carsBrands = [
    "Chevrolet",
    "Citroën",
    "Fiat",
    "Ford",
    "Honda",
    "Hyundai",
    "Nissan",
    "Peugeot",
    "Renault",
    "Toyota",
    "Volkswagen",
    "Mercedes",
  ];

  const colors = ["Azul", "Branco", "Cinza", "Prata", "Preta", "Vermelho"];
  const fuels = ["Diesel", "Etanol", "Gasolina", "Flex"];

  async function getData() {
    const res = await fetch("https://m6-emotors.onrender.com/announcements");

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }

  useEffect(() => {
    async function fetchData() {
      try {
        // const dataBrand = await getBrand();
        const data = await getData();
        const years = data.map((car: { year: any }) => {
          return car.year;
        });

        const uniqueYears = years.filter(
          (year: any, index: any, arr: string | any[]) =>
            arr.indexOf(year) === index
        );

        const brandNames = data.map((item: { brand: any }) => {
          return item.brand;
        });

        const modelNames = data.map((item: { model: any }) => {
          return item.model;
        });

        const fuelCar = data.map((item: { fuel: any }) => {
          return item.fuel;
        });

        const kmCar = data.map((item: { mileage: any }) => {
          return item.mileage;
        });

        const priceCar = data.map((item: { sellPrice: any }) => {
          return item.sellPrice;
        });

        const colorCar = data.map((item: { color: any }) => {
          return item.color;
        });

        setKm(kmCar);
        setPrice(priceCar);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const props = {
    filterType,
    setFilterType,
    filter,
    setFilter,
    models,
    colors,
    fuels,
    carsBrands,
    year,
    price,
    km,
    choosenYear,
    filterClear,
    setClearFilter,
  };

  return <Context.Provider value={props}>{children}</Context.Provider>;
};

export { Context, Provider };
