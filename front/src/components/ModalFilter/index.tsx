import { createPortal } from "react-dom";
import Filters from "../Filters";
import styles from "./styles.module.scss";

const ModalFilter = ({
  setModal,
}: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return createPortal(
    <div className={styles.modal}>
      <div>
        <Filters setModal={setModal} close={true} />
      </div>
    </div>,
    document.body
  );
};

export default ModalFilter;
