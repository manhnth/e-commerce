import { useState } from "react";
import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import s from "./Search.module.css";
import cn from "clsx";

import { getStaticProps } from "pages/search/[category]";
import { useSearch } from "lib/hooks/useSearch";
import { useSearchMeta } from "lib/search";

import Container from "../ui/Container";
import { ProductCard } from "@components/product/ProductCard";
import { ArrowDown } from "@components/icons/ArrowDown";
import { SORTS } from "constants/data";

export default function Search({
  CATEGORIES,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [activeFilter, setActiveFilter] = useState("");
  const [toggleFiler, setToggleFilter] = useState(false);

  const router = useRouter();

  const { q, sort, cat } = router.query;

  const { pathname, category } = useSearchMeta(router.asPath);

  const activeCategory = CATEGORIES.find((cat: any) => cat.slug === category);
  const activeSort = SORTS.find((s) => s.slug === sort);

  const { data, error } = useSearch({
    search: typeof q === "string" ? q : "",
    categoryName: activeCategory?.name || (cat as string),
    sort: typeof sort === "string" ? sort : "",
  });

  const handleClick = (event: any, filter: string) => {
    if (filter !== activeFilter) {
      setToggleFilter(true);
    } else {
      setToggleFilter(!toggleFiler);
    }
    setActiveFilter(filter);
  };
  return (
    <Container>
      <div className="mt-3 mb-20 grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/*Category Options  */}
        <div className="order-1 col-span-8 lg:order-none lg:col-span-2">
          <div className="relative inline-block w-full">
            <div
              className="lg:hidden"
              onClick={(e) => handleClick(e, "categories")}
            >
              <span className={s.filter_span}>
                <button>{`Danh mục: ${activeCategory?.name}`}</button>
                <ArrowDown />
              </span>
            </div>
            <div
              className={cn(s.filter_div, {
                hidden: activeFilter !== "categories" || toggleFiler !== true,
              })}
            >
              {/* large screen */}
              <span className="hidden pb-3 font-bold lg:block">Danh mục</span>
              <ul>
                {CATEGORIES.map((c, i) => {
                  return (
                    <li
                      key={i}
                      onClick={(e) => handleClick(e, "categories")}
                      className={cn(s.list_item, {
                        underline: activeCategory?.name === c.name,
                      })}
                    >
                      <Link href={`/search/${c.slug}`}>{c.name}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        {/* Product List */}
        <div className="order-3 col-span-8 lg:order-none">
          <div className="grid grid-cols-1 place-items-center gap-6 gap-1 sm:grid-cols-2 lg:grid-cols-3">
            {data &&
              data.data.map((p: any, i: any) => (
                <ProductCard product={p} key={i} />
              ))}
          </div>
        </div>
        {/* Filter options */}
        <div className="order-2 col-span-8 lg:order-none lg:col-span-2">
          {}
          <div className="relative inline-block w-full">
            <div onClick={(e) => handleClick(e, "sort")} className="lg:hidden">
              <span className={s.filter_span}>
                <button>{`Xếp theo: ${activeSort?.name || "Mới nhất"}`}</button>
                <ArrowDown />
              </span>
            </div>
            <div
              className={cn(s.filter_div, {
                hidden: activeFilter !== "sort" || toggleFiler !== true,
              })}
            >
              {/* large screen */}
              <span className="hidden pb-3 font-bold lg:block">
                Sắp xếp theo
              </span>
              <ul>
                {SORTS.map((srt, i) => {
                  return (
                    <li
                      key={i}
                      onClick={(e) => handleClick(e, "sort")}
                      className={cn(s.list_item, {
                        underline: sort === srt.slug,
                      })}
                    >
                      <Link href={{ pathname, query: `sort=${srt.slug}` }}>
                        {srt.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
