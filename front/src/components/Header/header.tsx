import styles from "../Header/styles.module.scss";
import logo from "../../assets/headerTitle.svg";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import TagOrAncors from "./components/TagOrAncors";
import { ToastContainer, toast } from "react-toastify";

const Header = () => {
  return (
    <>
      <header className={styles.conteiner}>
        <div>
          <Image src={logo} alt="logotipo motors shop" />
          <TagOrAncors />
          <button>
            <AiOutlineMenu />
          </button>
        </div>
      </header>
      <ToastContainer />
    </>
  );
};

export default Header;
