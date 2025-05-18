import { useEffect, useState } from "react";

export default function useSearchFilter<T>(
  items: T[] | undefined,
  searchKey: (item: T) => string
) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<T[]>([]);

  useEffect(() => {
    if (!items) return;

    const lower = searchTerm.toLowerCase();

    const filtered = items.filter((item) =>
      searchKey(item).toLowerCase().includes(lower)
    );

    setFilteredItems(filtered);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, items]);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
  };
}
