import styles from "./styles.module.scss";
import headerTitle from "../assets/headerTitle.svg";
import backGroundBanner from "../assets/backgroundBanner.svg";
import Image from "next/image";
import CardAdd from "@/components/CardAdd/index.card-add";

export default function Home() {
  const brands = [
    "General Motors",
    "Fiat",
    "Ford",
    "Honda",
    "Porsche",
    "Volkswagen",
  ];
  const models = [
    "Civic",
    "Corolla",
    "Cruze",
    "Fit",
    "Gol",
    "Ka",
    "Onix",
    "Porsche 718",
  ];
  const colors = ["Azul", "Branca", "Cinza", "Prata", "Preta", "Verde"];
  const years = ["2022", "2021", "2018", "2015", "2013", "2012", "2010"];
  const fuels = ["Diesel", "Etanol", "Gasolina", "Flex"];

  return (
    <main className={styles.home}>
      <header>
        <div className={styles.divLeft}>
          <Image src={headerTitle} alt="" />
        </div>
        <div className={styles.divRight}>
          <h3>Fazer Login</h3>
          <button>Cadastrar</button>
        </div>
      </header>

      <section className={styles.bannerCentral}>
        <Image src={backGroundBanner} alt="" />
      </section>

      <div className={styles.filtersAndCars}>
        <section className={styles.filters}>
          <div>
            <div>
              <h4>Marca</h4>
              <ul>
                {brands.map((brand) => (
                  <li key={brand}>{brand}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Modelo</h4>
              <ul>
                {models.map((model) => (
                  <li key={model}>{model}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Cor</h4>
              <ul>
                {colors.map((color) => (
                  <li key={color}>{color}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Ano</h4>
              <ul>
                {years.map((year) => (
                  <li key={year}>{year}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Combustível</h4>
              <ul>
                {fuels.map((fuel) => (
                  <li key={fuel}>{fuel}</li>
                ))}
              </ul>
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
          <div className={styles.btnCleanFilter}>
            <button>Limpar Filtros</button>
          </div>
        </section>
        <section className={styles.listOfCars}>
          <div>
            <ul>
              <CardAdd />
            </ul>
          </div>
        </section>
      </div>
      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <h2>Motors</h2>
          <h4>shop</h4>
        </div>
        <div className={styles.center}>
          <h4>@2022 - Todos os direitos reservados</h4>
        </div>
        <div className={styles.footerRight}>
          <button className={styles.btnFooter}>^</button>
        </div>
      </footer>
    </main>
  );
}
