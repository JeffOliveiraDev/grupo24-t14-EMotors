import styles from "../CardAddNewCar/styles.module.scss";
import Image from "next/image";
import carImg from "../../assets/imageCar.svg";
import Tag from "../Tags/tags";
import { useEffect, useState } from "react";

interface ICar {
  id: string;
  name: string;
  brand: string;
  year: string;
  fuel: number;
}

interface Car {
  name: string;
}

interface BrandCars {
  [brand: string]: Car[];
}

interface CardAddProps {
  brand: string;
}

const CardAddNewCar = ({
  brand,
  choosenYear,
  filterClear,
  setClearFilter,
}: any) => {
  const [cars, setCars] = useState<BrandCars[]>();
  const [filteredCars, setFilteredCars] = useState<BrandCars[]>([]);
  const [itens, setItens] = useState<BrandCars[]>([]);
  const [itensPerPage, setItensPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

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
            <li className={styles.container} key={car.id}>
              <div className={styles.boxImage}>
                <Image alt="image car" width={100} height={100} src={carImg} />
              </div>
              <h3>{car.name}</h3>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem...
              </p>
              <div className={styles.boxUser}>
                <div>
                  <p className={styles.boxImageOwner}>R</p>
                </div>
                <p>rafael</p>
              </div>
              <div className={styles.boxTagsPrice}>
                <ul>
                  <Tag key={car.year}>{car.year}</Tag>
                </ul>
                <span>
                  <strong>R$ {car.value.toLocaleString()}</strong>
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
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
