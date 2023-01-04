import { formatCurrency, truncateString } from "lib/utils";
import { Product } from "lib/types";
import Link from "next/link";
import React from "react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, name, price, imgUrl } = product;

  return (
    <div className="w-full">
      <Link
        key={id}
        href={`/product/${id}`}
        className="block h-72 border border-transparent p-6 hover:border hover:border-sky-500"
      >
        <img src={imgUrl} className="h-36 w-32" alt="" />
        <div className="flex h-20 flex-col justify-between">
          <span className="block pb-4">{truncateString(name)}</span>
          <span className="block font-bold text-blue-600">
            {formatCurrency(price)}
          </span>
        </div>
      </Link>
    </div>
  );
};
