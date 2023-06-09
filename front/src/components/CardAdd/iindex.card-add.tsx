import styles from "../CardAdd/styles.module.scss";
import Image from "next/image";
import car from "../../assets/imageCar.svg";
import Tag from "../Tags/index.tags";

const CardAdd = () => {
  const array = [{ text: "0Km" }, { text: "2023" }];

  return (
    <div className={styles.container}>
      <div className={styles.boxImage}>
        <Image alt="image car" width={100} height={100} src={car} />
      </div>
      <h3>Porsche - 718</h3>

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
          {array.map((e, i) => (
            <Tag key={i}>{e.text}</Tag>
          ))}
        </ul>

        <span>R$ 00.000,00</span>
      </div>
    </div>
  );
};

export default CardAdd;
