"use client";
import styles from "../CardAddNewCar/styles.module.scss";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/context/HomeContext";
import { BrandCars, iCar } from "@/interfaces";
import CardCar from "../CardCar";
import Button from "../Button";
import ModalFilter from "../ModalFilter";

const CardAddNewCar = ({}: any) => {
  const [cars, setCars] = useState<BrandCars[]>();
  const [filteredCars, setFilteredCars] = useState<BrandCars[]>([]);
  const [itens, setItens] = useState<BrandCars[]>([]);
  const [itensPerPage, setItensPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [modal, setModal] = useState(false);

  const { brand, filterClear, choosenYear } = useContext(Context);

  let pages = 0;
  let startIndex = 0;
  let endIndex = 0;
  let currentItens: any[] = [];

  if (itens) {
    pages = Math.ceil(itens.length / itensPerPage);
    startIndex = currentPage * itensPerPage;
    endIndex = startIndex + itensPerPage;
    currentItens = itens.slice(startIndex, endIndex);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData(brand!);
        setCars(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [brand]);

  useEffect(() => {
    if (choosenYear) {
      const filteredCars = cars?.filter((car) => car.year === choosenYear);
      setItens(filteredCars || []);
    } else {
      setItens(cars || []);
    }
  }, [choosenYear, cars]);

  async function getData(brand: string) {
    const res = await fetch(
      `https://kenzie-kars.herokuapp.com/cars?brand=${brand}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }

  return (
    <div className={styles.boxUl}>
      {currentItens?.length > 0 && (
        <ul className={styles.boxCars}>
          {currentItens.map((car: any) => (
            <CardCar car={car} key={car.id} />
          ))}
        </ul>
      )}
      {modal && <ModalFilter setModal={setModal} />}
      <Button
        onClick={() => setModal((e) => !e)}
        className={styles.buttonFilter}
      >
        Filtros
      </Button>
      <div className={styles.btnPages}>
        {pages === 0 ? (
          <h4>
            <span>0</span> de 0
          </h4>
        ) : pages === 1 ? (
          <h4>
            <span>{currentPage + 1}</span> de 1
          </h4>
        ) : (
          <h4>
            <span>{currentPage + 1}</span> de {pages}
          </h4>
        )}
        {pages === 0 ? null : pages === 1 ? null : currentPage + 1 === pages ? (
          <button
            value={currentPage}
            onClick={(e) => setCurrentPage(currentPage - 1)}
          >
            {"<"} Voltar
          </button>
        ) : (
          <button
            value={currentPage}
            onClick={(e) => setCurrentPage(currentPage + 1)}
          >
            Seguinte {">"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CardAddNewCar;
