import styles from "../Header/styles.module.scss";
import logo from "../../assets/headerTitle.svg";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
  return (
    <header className={styles.conteiner}>
      <div>
        <Image src={logo} alt="logotipo motors shop" />
        <div>
          <Link className={styles.login} href="/login">
            Fazer Login
          </Link>
          <Link className={styles.register} href="/register">
            Cadastrar
          </Link>
        </div>
        <button>
          <AiOutlineMenu />
        </button>
      </div>
    </header>
  );
};

export default Header;
