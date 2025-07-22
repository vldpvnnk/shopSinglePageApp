import { Roboto } from "next/font/google";
import styles from "@/styles/Home.module.css";
import ProductList from "@/components/product-list";
import Header from "@/components/header";
const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});
export default function Home() {
  return (
    <>
    <div className={`${styles.page} ${roboto.variable}`}>
      <Header/>
      <ProductList/>
    </div>
    </>
  );
}
