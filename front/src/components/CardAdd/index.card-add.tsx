import styles from "../CardAdd/styles.module.scss";
import Image from "next/image";
import carImg from "../../assets/imageCar.svg";
import Tag from "../Tags/index.tags";
import {
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";

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

const CardAdd = ({ brand, choosenYear, page }: any) => {
  const [cars, setCars] = useState<BrandCars[]>();
  const [filteredCars, setFilteredCars] = useState<BrandCars[]>([]);
  const [itens, setItens] = useState([0]);
  const carsToRender = cars?.slice((page - 1) * 12, page * 12);

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
      const filteredCars = cars!.filter((car) => car.year === choosenYear);
      setFilteredCars(filteredCars);
    } else {
      setFilteredCars(cars!);
    }
  }, [choosenYear, cars]);

  async function getData(brand: string) {
    const res = await fetch(
      `https://kenzie-kars.herokuapp.com/cars?brand=${brand}`
    );

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }

  return (
    <div className={styles.boxUl}>
      {filteredCars?.length > 0 && (
        <ul className={styles.boxCars}>
          {filteredCars.map((car: any) => (
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
    </div>
  );
};
// <div className={styles.boxUl}>
//   {cars && (
//     <ul className={styles.boxCars}>
//       {cars.map((car: any) => (
//         <li className={styles.container} key={car.id}>
//           <div className={styles.boxImage}>
//             <Image alt="image car" width={100} height={100} src={carImg} />
//           </div>
//           <h3>{car.name}</h3>
//           <p>
//             Lorem Ipsum is simply dummy text of the printing and typesetting
//             industry. Lorem...
//           </p>
//           <div className={styles.boxUser}>
//             <div>
//               <p className={styles.boxImageOwner}>R</p>
//             </div>

//             <p>rafael</p>
//           </div>

//           <div className={styles.boxTagsPrice}>
//             <ul>
//               <Tag key={car.year}>{car.year}</Tag>
//               {/* {cars.map((e, i) => (
//                 <Tag key={i}>{e.year}</Tag>
//               ))} */}
//             </ul>

//             <span>
//               <strong>R$ {car.value.toLocaleString()}</strong>
//             </span>
//           </div>
//         </li>
//       ))}
//     </ul>
//   )}
// </div>
// );
// };

export default CardAdd;
