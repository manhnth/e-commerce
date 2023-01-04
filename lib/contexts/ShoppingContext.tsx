import { refresh } from "lib/api/auth";
import { axiosWithToken } from "lib/api/axiosApi";
import { fetchWithToken } from "lib/api/cart";
import { AddToCartProps, CreateOrderProps } from "lib/types";
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
  const [isUser, setIsUser] = useState(false);
  const {
    data: cartData,
    trigger: triggerCart,
    error: cartError,
    isMutating,
  } = useSWRMutation(isUser ? "cart" : null, fetchWithToken, {});

  const addItemToCart = async (props: AddToCartProps) => {
    try {
      const res = await axiosWithToken.post("cart/addItem", { ...props });
      triggerCart();
      return res;
    } catch (error) {
      return null;
    }
  };

  const updateCartItemQuantity = async (
    type: string,
    cartItemId: number,
    productId: number
  ) => {
    const res = await axiosWithToken.post("cart/updateCartItemQuantity", {
      type,
      cartItemId,
      productId,
    });
    await triggerCart();
    return res;
  };

  const deleteCartItem = async (cartItemId: number) => {
    await axiosWithToken.delete(`cart/delete/${cartItemId}`);
    await triggerCart();
  };

  const createOrder = async (createOrderProps: CreateOrderProps) => {
    const res = await axiosWithToken.post("/orders/create", {
      ...createOrderProps,
    });
    if (!res || res.status !== 201) return null;
    await triggerCart();
    return res;
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
    isUser && triggerCart();
  }, [isUser]);

  const value = {
    cartData,
    addItemToCart,
    isMutating,
    setIsUser,
    isUser,
    updateCartItemQuantity,
    triggerCart,
    deleteCartItem,
    createOrder,
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
