"use client";
import { IProducts } from "@/api/product.api";
import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./styles.module.css";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getProductsByPagination } from "@/store/slices/products/products.actions";
import { Status } from "@/store/slices/products/products.types";
import { SkeletonCard } from "../ProductCard/Skeleton";
import { setProducts } from "@/store/slices/products/products.slice";
export const ProductList = ({
  initialProducts,
}: {
  initialProducts?: IProducts[];
}) => {
  const [currentPage, setCurrentPage] = useState(2);
  const dispatch = useAppDispatch();
  const { meta, products, status } = useAppSelector((state) => state.products);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const TOTAL_PRODUCTS = meta.total ?? 228;
  useEffect(() => {
    dispatch(setProducts(initialProducts));
  }, [initialProducts, dispatch]);

  useEffect(() => {
    if (inView && meta.pagination.page * 20 < TOTAL_PRODUCTS) {
      dispatch(getProductsByPagination({ page: currentPage, pageSize: 20 }));
      setCurrentPage((prev) => prev + 1);
    }
  }, [
    inView,
    dispatch,
    currentPage,
    meta.total,
    meta.pagination.page,
    TOTAL_PRODUCTS,
  ]);

  return (
    <>
      <div className={styles.wrapper}>
        {initialProducts?.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
        {status == Status.LOADING &&
          Array(20)
            .fill(null)
            .map((_, i) => <SkeletonCard key={i} />)}
        {products.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
        {status != Status.LOADING && <div ref={ref} />}
      </div>
      {status == Status.ERROR && <p>Ошибка загрузки</p>}
    </>
  );
};
