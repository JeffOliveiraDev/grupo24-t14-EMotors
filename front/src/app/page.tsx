"use client";
import styles from "./styles.module.scss";
import headerTitle from "../assets/headerTitle.svg";
import backGroundBanner from "../assets/backgroundBanner.svg";
import Image from "next/image";
import CardAddNewCar from "@/components/CardAddNewCar/cardAddNewCar";
import { GetServerSideProps, NextPage } from "next";

import api from "@/services/api";
import { useEffect, useState } from "react";

import ModalEditUser from "@/components/modalEditUser";

import Link from "next/link";
import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";


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

  async function getBrand() {
    const res = await fetch("https://kenzie-kars.herokuapp.com/cars");

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }

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

  const [modalOpen, setModalOpen] = useState(false);
  return (
    <main className={styles.home}>

      <button onClick={() => setModalOpen(true)}>editar</button>
      {modalOpen && (
        <ModalEditUser modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
      
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
