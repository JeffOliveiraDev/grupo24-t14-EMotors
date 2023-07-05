import styles from "./styled.module.scss";
import CardAddNewCar from "../CardAddNewCar/cardAddNewCar";
import Filters from "../Filters";

const SectionContet = () => {
  return (
    <section className={styles.filtersAndCars}>
      <div>
        <aside className={styles.filters}>
          <Filters />
        </aside>
        <section className={styles.listOfCars}>
          <CardAddNewCar />
        </section>
      </div>
    </section>
  );
};

export default SectionContet;
