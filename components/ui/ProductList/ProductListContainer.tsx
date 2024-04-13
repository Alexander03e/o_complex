import { ProductApi } from "@/api/product.api";
import styles from "./styles.module.css";
import { ProductList } from "./ProductList";

export const ProductListContainer = async () => {
  const productsApi = ProductApi.getInstance();
  const data = await productsApi.getProducts();
  return (
    <div className={styles.wrapper}>
      <ProductList initialProducts={data?.products} />
    </div>
  );
};
