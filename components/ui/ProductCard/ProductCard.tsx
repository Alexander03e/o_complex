"use client";

import { IProducts } from "@/api/product.api";
import { Button } from "../Button/Button";
import styles from "./styles.module.css";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  addSomeProducts,
  addToCart,
  removeFromCart,
} from "@/store/slices/cart/cart.slice";

export const ProductCard: React.FC<IProducts> = ({
  description,
  id,
  image_url,
  price,
  title,
}) => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.cart);
  const currentProduct = products.find((item) => item.id == id);
  const handleClick = () => {
    dispatch(addToCart({ id, title, price }));
  };
  const changeProductsCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      dispatch(addSomeProducts({ id, title, price, count: +e.target.value }));
    }
  };
  const minusCount = () => {
    if (currentProduct && currentProduct?.count == 1) {
      dispatch(removeFromCart({ id, title, price }));
    }
    if (currentProduct && currentProduct.count >= 1) {
      dispatch(removeFromCart({ id, title, price }));
    }
  };

  const plusCount = () => {
    dispatch(addToCart({ id, title, price }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        <Image src={image_url} alt="test" width={261} height={366} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.description}>
          <p>{description}</p>
        </div>
      </div>
      <h2 className={styles.cost}>Цена: {price} Р</h2>
      <div className={styles.buttonsList}></div>
      {!currentProduct?.count && (
        <div className={styles.buttonsList}>
          <Button title="Заказать" onClick={handleClick} />
        </div>
      )}
      {currentProduct?.count ? (
        <div className={styles.buttonsList}>
          <Button style={{ flex: "0.3" }} onClick={minusCount} title="-" />
          <input
            className={styles.countInput}
            onChange={changeProductsCount}
            value={currentProduct.count}
          />
          <Button style={{ flex: "0.3" }} onClick={plusCount} title="+" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
