import { useState } from "react";

export const useAddItem = () => {
  const [quantity, setQuantity] = useState<number>(0);

  const updateQuantity = (action: string, max: number) => {
    if (action === "dec") {
      if (quantity < 1) return;
      setQuantity((quantity) => quantity - 1);
    } else {
      if (quantity > max - 1) return;
      setQuantity((quantity) => quantity + 1);
    }
  };

  return {
    quantity,
    setQuantity,
    updateQuantity,
  };
};
