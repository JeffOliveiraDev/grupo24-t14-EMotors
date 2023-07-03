import styles from "../Header/styles.module.scss";
import logo from "../../assets/headerTitle.svg";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { parseCookies } from "nookies";

const Header = () => {
  const cookies = parseCookies();
  const user = JSON.parse(cookies.user || "null");

  return (
    <header id="top" className={styles.conteiner}>
      <div>
        <Image src={logo} alt="logotipo motors shop" />
        <div className={user && styles.gap}>
          {user ? (
            <>
              <span>
                {user.name[0].toUpperCase() + user.name[1].toUpperCase()}
              </span>
              <p>{user.name.substring(0, 10) + "..."}</p>
            </>
          ) : (
            <>
              <Link className={styles.login} href="/login">
                Fazer Login
              </Link>
              <Link className={styles.register} href="/register">
                Cadastrar
              </Link>
            </>
          )}
        </div>
        <button>
          <AiOutlineMenu />
        </button>
      </div>
    </header>
  );
};

export default Header;
