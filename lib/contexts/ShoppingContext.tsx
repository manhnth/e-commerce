import { refresh } from "lib/api/auth";
import { fetcherWithToken } from "lib/api/axiosApi";
import { fetchCart } from "lib/api/cart";
import { useUser } from "lib/hooks/useUser";
import { AddToCartProps } from "lib/types";
import React, { useContext, useEffect, useState } from "react";
import { createContext, ReactNode } from "react";
import useSWRMutation from "swr/mutation";

interface State {
  cartId: number;
  cartItems: [];
  quantity: number;
}

const initialState = {
  cartId: 0,
  cartItems: [],
  quantity: 0,
};

export const ShoppingContext = createContext<State | any>(initialState);

export const ShoppingProvider: React.FC<{ children?: ReactNode }> = (props) => {
  const {
    data: cartData,
    trigger: triggerCart,
    error: cartError,
    isMutating,
  } = useSWRMutation("cart", fetchCart, {});
  // const { isUser, user, setIsUser } = useUser();
  const [subTotal, setSubtotal] = useState(0);
  const [isUser, setIsUser] = useState(false);

  const addItemToCart = async (props: AddToCartProps) => {
    try {
      const res = await fetcherWithToken.post("cart/addItem", { ...props });
      triggerCart();
      return res;
    } catch (error) {
      return null;
    }
  };

  const fetchUser = async () => {
    try {
      const res = await refresh();
      if (res) setIsUser(true);
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    triggerCart();
  }, [isUser]);

  const value = {
    cartData,
    addItemToCart,
    isMutating,
    setIsUser,
    isUser,
  };

  return <ShoppingContext.Provider value={value} {...props} />;
};

export const useShopping = () => {
  const context = useContext(ShoppingContext);
  if (context === undefined) {
    throw new Error(`useShopping must be used within a ShoppingProvider`);
  }
  return context;
};
