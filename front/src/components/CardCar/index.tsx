import Image from "next/image";
import styles from "./styles.module.scss";
import { iCar } from "@/interfaces";
import carImg from "../../assets/imageCar.svg";
import Tag from "../Tags/tags";
import Link from "next/link";
import { useContext } from "react";
import { Context } from "@/context/HomeContext";

const CardCar = ({ car }: any) => {
  console.log(car);
  return (
    <li className={styles.container} key={car.id}>
      <Link href={`/productPage/${car.id}`}>
        <div className={styles.boxImage}>
          <Image
            alt="image car"
            width={100}
            height={100}
            src={car.coverImage}
          />
        </div>
        <h3>{car.model}</h3>
        <p>{car.description}..</p>
      </Link>
      <div className={styles.boxUser}>
        <div>
          <p className={styles.boxImageOwner}>
            {car.user.name.slice(0, 2).toUpperCase()}
          </p>
        </div>
        <Link href={`/announcesPage`}>
          <p>{car.user.name}</p>
        </Link>
      </div>
      <div className={styles.boxTagsPrice}>
        <ul>
          <Tag key={car.mileage}>{car.mileage}</Tag>
        </ul>
        <span>
          <strong>R$ {car.sellPrice.toLocaleString()}</strong>
        </span>
      </div>
    </li>
  );
};

export default CardCar;
