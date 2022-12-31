import { useEffect, useState } from "react";

export function useSearchMeta(asPath: string) {
  const [pathname, setPathname] = useState<string>("/search");
  const [category, setCategory] = useState<string | undefined>();

  useEffect(() => {
    // Only access asPath after hydration to avoid a server mismatch
    const path = asPath.split("?")[0];
    const parts = path.split("/");

    const c = parts[2];

    if (path !== pathname) setPathname(path);
    if (c !== category) setCategory(c);
  }, [asPath, pathname, category]);

  return { pathname, category };
}
