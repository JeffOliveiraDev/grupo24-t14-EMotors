import styles from "./styles.module.scss";
import { NextPage } from "next";
import SectionContet from "@/components/Aside";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";

interface ICar {
  car: CarData;
}

interface HomeListCars {
  carsList: ICar[];
}

interface CarBrand {
  name: string;
}

interface CarData {
  [brand: string]: CarBrand[];
}

const Home: NextPage<CarData> = () => {
  return (
    <main className={styles.home}>
      <Header />

      <section className={styles.bannerCentral}>
        <div>
          <h1>Motors Shop</h1>
          <h2>A melhor plataforma de anúncios de carros do país</h2>
        </div>
      </section>
      <SectionContet />
      <Footer top="" />
    </main>
  );
};

export default Home;
