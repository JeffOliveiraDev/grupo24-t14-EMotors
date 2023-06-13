import Image from "next/image";
import logo from "../../assets/Motors shop-withe.svg";
import styles from "./styles.module.scss";
import Link from "next/link";
import angle from "../../assets/angle-up.svg";

const Footer = () => {
  return (
    <footer className={styles.conteiner}>
      <div>
        <Image src={logo} alt="logotipo motors shop" />
        <p>© 2022 - Todos os direitos reservados.</p>
        <Link href="/login#top">
          <Image src={angle} alt="Voltar para o topo" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
