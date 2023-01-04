import { GetStaticPropsContext } from "next";
import Search from "@components/search/Search";
import { CATEGORIES } from "constants/data";

export function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: { CATEGORIES },
    revalidate: 4000,
  };
}

export default Search;
