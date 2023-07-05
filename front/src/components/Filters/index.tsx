import ListCarsBrands from "../Aside/components/ListCarBrands";
import ListColors from "../Aside/components/ListColors";
import ListFuel from "../Aside/components/ListFuel";
import ListModels from "../Aside/components/ListModels";
import ListYear from "../Aside/components/ListYear";
import Button from "../Button";
import styles from "./styled.module.scss";
import { AiOutlineClose } from "react-icons/ai";

const Filters = ({
  close,
  setModal,
}: {
  close?: boolean;
  setModal?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      {close && setModal && (
        <div className={styles.boxCloseFilter}>
          <h3>Filtro</h3>
          <Button onClick={() => setModal((e) => !e)}>
            <AiOutlineClose />
          </Button>
        </div>
      )}
      <div>
        <div>
          <h4>Marca</h4>
          <ListCarsBrands />
        </div>
        <div>
          <h4>Modelo</h4>
          <ListModels />
        </div>
        <div>
          <h4>Cor</h4>
          <ListColors />
        </div>
        <div>
          <h4>Ano</h4>
          <ListYear />
        </div>
        <div>
          <h4>Combustível</h4>
          <ListFuel />
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
      <div className={styles.CleanFilter}>
        <Button className={styles.btnCleanFilter}>Limpar Filtros</Button>
      </div>
    </>
  );
};

export default Filters;
