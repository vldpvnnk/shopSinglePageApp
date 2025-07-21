import { Roboto } from "next/font/google";
import styles from "@/styles/Home.module.css";
import PersonalAccount from "@/components/icons/PersonalAccount";
const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"], // укажи нужные веса
  variable: "--font-roboto",
  display: "swap",
});
export default function Home() {
  return (
    <>
    <div className={`${styles.page} ${roboto.variable}`}>
      <header className={styles.header}>
        <p className={styles.catalog}>Каталог</p>
        <div>
          <p>Сравнение</p>
          <PersonalAccount/>
        </div>
      </header>
    </div>
    </>
  );
}
