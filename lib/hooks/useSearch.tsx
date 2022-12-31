import axios from "axios";
import useSwr from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export interface UseSearchProps {
  search?: string;
  categoryName?: string;
  sort?: string;
}
export function useSearch({ search, categoryName, sort }: UseSearchProps) {
  const query = `category=${categoryName || ""}&q=${search}&sort=${sort}`;

  const { data, error, isLoading } = useSwr(
    `/products/search?${query}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
  };
}
