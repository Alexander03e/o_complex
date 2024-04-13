"use client";
import { useAppDispatch, useAppSelector } from "@/store/store";
import styles from "./styles.module.css";
import { clearCart, setNumber } from "@/store/slices/cart/cart.slice";
import ReactInputMask from "react-input-mask";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChangeEvent, useEffect, useState } from "react";
import { Popup } from "./Popup";

const Alert = ({
  title,
  onClose,
}: {
  title: string;
  onClose: (value: boolean) => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [onClose]);
  return <Popup title={title} />;
};

export const Cart = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [blockSend, setBlockSend] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupTimer, setPopupTimer] = useState(false);
  const dispatch = useAppDispatch();
  const { products, totalPrice, number } = useAppSelector(
    (state) => state.cart
  );

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {
    if (!products.length) {
      setPopupTitle("Список товаров пуст!");
      setShowPopup(true);
      return;
    }
    if (popupTimer) {
      return;
    }
    if (blockSend) {
      setPopupTitle("Подождите 15 секунд перед отправкой следующей заявки!");
      setPopupTimer(true);
      setTimeout(() => {
        setPopupTimer(false);
      }, 3000);
      setShowPopup(true);
      return;
    }
    setShowPopup(true);
    setBlockSend(true);
    setPopupTitle("Заявка отправлена!");
    setPopupTimer(true);
    setTimeout(() => {
      setPopupTimer(false);
    }, 3000);
    setTimeout(() => {
      setBlockSend(false);
    }, 15000);
    console.log(data);
  };
  const numberChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setNumber(e.target.value));
  };
  return (
    <div className={styles.wrapper}>
      {showPopup && <Alert title={popupTitle} onClose={setShowPopup} />}
      <h2 style={{ marginBottom: "15px" }}>Добавленные товары</h2>
      {!products.length && <p>Добавленных товаров нет</p>}
      {products.map((item) => {
        return (
          <div className={styles.productsCart} key={item.id}>
            <p className={styles.productTitle}>{item.title}</p>
            <p className={styles.productCount}>x{item.count}</p>
            <p className={styles.productSum}>{item.sum}&#8381;</p>
          </div>
        );
      })}
      <div className={styles.cartSum}>
        <p>Итого: {totalPrice}&#8381;</p>
        {products.length ? (
          <p onClick={handleClearCart} className={styles.clearButton}>
            Очистить список
          </p>
        ) : (
          ""
        )}
      </div>
      <form className={styles.buttons} onSubmit={handleSubmit(onSubmit)}>
        <ReactInputMask
          mask="+7 (999) 999-99-99"
          maskChar="_"
          placeholder="+7 (___) ___-__-__"
          className={styles.input}
          value={number}
          style={
            errors.phoneNumber && {
              outline: "1px solid red",
            }
          }
          {...register("phoneNumber", {
            required: true,
            pattern: {
              value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
              message: "Введите номер телефона полностью!",
            },
          })}
          onChange={numberChange}
        />
        <button
          type="submit"
          style={
            popupTimer
              ? { backgroundColor: "#777777", borderColor: "#777777" }
              : {}
          }
          className={styles.button}
        >
          Заказать
        </button>
      </form>
      <span style={{ height: "20px", width: "100%", display: "block" }}>
        {errors.phoneNumber && <>Номер телефона обязателен</>}
      </span>
    </div>
  );
};
