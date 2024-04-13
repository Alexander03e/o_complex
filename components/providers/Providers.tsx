"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import store, { AppDispatch, persistor } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const storeRef = useRef<typeof store>();
  if (!storeRef.current) {
    storeRef.current = store;
  }
  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
