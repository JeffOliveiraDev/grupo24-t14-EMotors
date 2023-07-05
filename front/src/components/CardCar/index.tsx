import Image from "next/image";
import styles from "./styles.module.scss";
import { iCar } from "@/interfaces";
import carImg from "../../assets/imageCar.svg";
import Tag from "../Tags/tags";

const CardCar = ({ car }: { car: iCar }) => {
  return (
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
  );
};

export default CardCar;
