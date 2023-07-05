import styles from "../Header/styles.module.scss";
import logo from "../../assets/headerTitle.svg";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import TagOrAncors from "./components/TagOrAncors";
import { ToastContainer } from "react-toastify";

const Header = ({ id }: { id?: string }) => {
  return (
    <>
      <header id={id} className={styles.conteiner}>
        <div>
          <Image src={logo} alt="logo tipo motors shop" />
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
