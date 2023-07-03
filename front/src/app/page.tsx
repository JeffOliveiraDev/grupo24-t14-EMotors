"use client";
import styles from "./styles.module.scss";
import backGroundBanner from "../assets/backgroundBanner.svg";
import Image from "next/image";
import { NextPage } from "next";

import { useEffect, useState } from "react";
import CardAddNewCar from "@/components/CardAddNewCar/cardAddNewCar";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";

interface ICar {
  car: CarData;
}

interface HomeListCars {
  carsList: ICar[];
}

interface CarBrand {
  name: string;
}

interface CarData {
  [brand: string]: CarBrand[];
}

const Home: NextPage<CarData> = ({ carsList }) => {
  const [carsBrands, setCarsBrands] = useState<string[]>([]);
  const [brand, setBrand] = useState("chevrolet");
  const [year, setYear] = useState([]);
  const [choosenYear, setchoosenYear] = useState();
  const [filterClear, setClearFilter] = useState(false);

  if (filterClear) {
    window.location.reload();
    setClearFilter(false);
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const dataBrand = await getBrand();
        const data = await getData();
        const years = data.map((car: { year: any }) => {
          return car.year;
        });
        console.log(dataBrand);
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

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQG1haWwuY29tIiwiaWF0IjoxNjg4Mzk2MDY5LCJleHAiOjE2ODg0ODI0NjksInN1YiI6IjFmNzlkZjM5LTg2YjctNDhjOC1iN2U4LTU4OGQ1YTc4ZjhmMCJ9.g23szdK3O8wNy59yjvdoA0gVqNxxNyKqAdym13Xkcvc";

  async function getBrand() {
    const res = await fetch("https://m6-emotors.onrender.com/announcements", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }

  // async function getBrand() {
  //   const res = await fetch("https://kenzie-kars.herokuapp.com/cars");

  //   if (!res.ok) {
  //     // This will activate the closest `error.js` Error Boundary
  //     throw new Error("Failed to fetch data");
  //   }

  //   return res.json();
  // }

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

  return (
    <main className={styles.home}>
      <Header />

      <section className={styles.bannerCentral}>
        <Image src={backGroundBanner} alt="" />
      </section>

      <div className={styles.filtersAndCars}>
        <section className={styles.filters}>
          <div>
            <div>
              <h4>Marca</h4>
              <ul>
                {carsBrands.map((brand) => (
                  <li key={brand} onClick={() => setBrand(brand)}>
                    {brand}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Modelo</h4>
              <ul>
                {models.map((model) => (
                  <li key={model}>{model}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Cor</h4>
              <ul>
                {colors.map((color) => (
                  <li key={color}>{color}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Ano</h4>
              <ul>
                {year.map((year) => (
                  <li key={year} onClick={() => setchoosenYear(year)}>
                    {year}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Combustível</h4>
              <ul>
                {fuels.map((fuel) => (
                  <li key={fuel}>{fuel}</li>
                ))}
              </ul>
            </div>
            <h4>Km</h4>
            <div className={styles.buttonsKmPrice}>
              <button>Mínima</button>
              <button>Máxima</button>
            </div>
            <h4>Preço</h4>
            <div className={styles.buttonsKmPrice}>
              <button>Mínimo</button>
              <button>Máximo</button>
            </div>
          </div>
          <div className={styles.btnCleanFilter}>
            <button onClick={() => setClearFilter(!filterClear)}>
              Limpar Filtros
            </button>
          </div>
        </section>
        <section className={styles.listOfCars}>
          <CardAddNewCar
            brand={brand}
            setBrand={setBrand}
            choosenYear={choosenYear}
            filterCLear={filterClear}
            setClearFilter={setClearFilter}
          />
        </section>
      </div>
      <Footer top="" />
    </main>
  );
};

export default Home;
