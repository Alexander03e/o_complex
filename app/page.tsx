import Image from "next/image";
import styles from "./page.module.css";
import { ReviewList } from "@/components/ui/ReviewList/ReviewList";
import { Cart } from "../components/ui/Cart/Cart";
import { ProductList } from "@/components/ui/ProductList/ProductList";
import { ProductListContainer } from "@/components/ui/ProductList/ProductListContainer";
// import { ProductListContainer } from "@/components/ui/ProductList/ProductListContainer";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <h1>тестовое задание</h1>
      </div>
      <ReviewList />
      <Cart />
      <ProductListContainer />
      {/* <ProductList /> */}
    </div>
  );
}
