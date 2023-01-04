import { ArrowRight } from "@components/icons/ArrowRight";
import Container from "@components/ui/Container";
import { Product } from "lib/types";
import Link from "next/link";
import React from "react";
import { ProductSideBar } from "./ProductSideBar";

interface ProductViewProps {
  product: Product;
}

export const ProductView: React.FC<ProductViewProps> = ({ product }) => {
  const { id, imgUrl, name, description, price, category, inventory } = product;

  return (
    <Container>
      <div className="mt-10 flex gap-1">
        <Link className="hover:text-blue-500" href={"/search"}>
          Danh mục
        </Link>
        <ArrowRight />
        <Link className="hover:text-blue-500" href={`/search/?cat=${category}`}>
          {category}
        </Link>
      </div>
      <div className="mt-6 justify-center  md:flex md:gap-6 lg:mb-48 lg:h-96 lg:grid-cols-2 lg:gap-16">
        <div className="w-full max-w-xl rounded-sm border border-gray-300 px-10">
          <img src={imgUrl} alt={name} className="h-full w-full" />
        </div>
        {/* product sidebar */}
        <ProductSideBar
          id={id}
          name={name}
          price={price}
          description={description}
          inventory={inventory}
        />
      </div>
    </Container>
  );
};
