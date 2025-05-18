"use client";

import ColumnsCard from "../../components/ColumnsCard";
import SearchInput from "../../components/SearchInput";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/lib/store";
import { removeProduct } from "./selectedProductsSlice";
import { Product } from "../../types/product";
import useSearchFilter from "@/app/hooks/useSearchFilter";

export default function SelectedProducts() {
  const selectedProducts = useSelector(
    (state: RootState) => state.selectedProducts.products
  );
  const dispatch = useDispatch();

  const { searchTerm, setSearchTerm, filteredItems } = useSearchFilter(
    selectedProducts,
    (product) => product.title
  );

  const handleRemove = (id: number) => {
    dispatch(removeProduct(id));
  };

  return (
    <ColumnsCard header="Selected Products">
      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {selectedProducts.length === 0 && (
          <li className="font-medium text-red-400 py-4">
            Selected products will show up here
          </li>
        )}
        {filteredItems.map((product: Product) => (
          <li
            key={product.id}
            className="p-4 flex items-center gap-4 border-b border-stone-300"
          >
            <Image
              src={product.image}
              alt={product.title}
              width={48}
              height={48}
              className="object-contain"
            />
            <span className="flex-1">{product.title}</span>
            <button
              onClick={() => handleRemove(product.id)}
              className="text-red-500 hover:text-red-700 cursor-pointer"
            >
              <FaTimes size={20} />
            </button>
          </li>
        ))}
      </ul>
    </ColumnsCard>
  );
}
