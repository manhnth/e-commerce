import { ProductView } from "@components/product/ProductCard/ProductView";
import { fetcher } from "lib/api/axiosApi";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSwr from "swr";
import useSWRMutation from "swr/mutation";
export default function Slug() {
  const router = useRouter();
  const { slug } = router.query;

  const { data, error, isLoading } = useSwr(
    slug ? `products/${slug}` : null,
    fetcher
  );

  // const { data, error, updateProduct } = useProduct(slug);

  // if (isLoading) return <div>loading</div>;
  if (error) return <div>error</div>;
  // if (data) return <div>data</div>;
  if (data) return <ProductView product={data} />;
}
