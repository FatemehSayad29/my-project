"use client";

import { useEffect, useRef, useState } from "react";
import { useGetProductsQuery } from "./productsApi";
import ColumnsCard from "../../components/ColumnsCard";
import SearchInput from "../../components/SearchInput";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { MdAttachMoney } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Product } from "@/app/types/product";
import { addProduct } from "../selectedProducts/selectedProductsSlice";
import Loader from "@/app/components/Loader";
import ToastMessage from "@/app/components/ToastMessage";
import useSearchFilter from "@/app/hooks/useSearchFilter";

export default function ProductsColumns() {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const {
    searchTerm,
    setSearchTerm,
    filteredItems: filteredProducts,
  } = useSearchFilter(products, (product) => product.title);

  const dispatch = useDispatch();
  const [visibleCount, setVisibleCount] = useState(10);
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const currentItems = filteredProducts?.slice(0, visibleCount);

  const handleSelectProduct = (product: Product) => {
    dispatch(addProduct(product));
  };

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + 10);
        }
      },
      {
        root: containerRef.current,
        threshold: 1.0,
      }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [filteredProducts]);

  if (isLoading) return <Loader />;
  if (error) return <ToastMessage message="Error in products fetching" />;

  return (
    <ColumnsCard header="Products">
      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div
        ref={containerRef}
        className="overflow-y-auto max-h-[600px] pr-2"
      >
        <ul>
          {currentItems?.map((product) => (
            <li
              key={product.id}
              className="p-4 flex gap-4 cursor-pointer border-b border-stone-300"
              onClick={() => handleSelectProduct(product)}
            >
              <Image
                src={product.image}
                alt={product.title}
                className="w-16 h-16 object-contain"
                width={64}
                height={64}
              />
              <div>
                <h3 className="font-semibold">{product.title}</h3>
                <p className="text-sm text-gray-600 flex mt-2">
                  <BiCategoryAlt size={18} color="#333" className="me-1" />
                  {product.category}
                </p>
                <p className="mt-2 text-gray-800 flex">
                  <MdAttachMoney size={20} color="#28a745" />
                  {product.price}
                </p>
                <p
                  className="text-sm mt-1 text-gray-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(product.id);
                  }}
                >
                  {expandedIds.includes(product.id)
                    ? product.description
                    : product.description.slice(0, 50) + "..."}
                </p>

                <p className="text-xs mt-2 text-yellow-500 flex items-center">
                  <FaStar color="gold" size={18} className="me-1" />
                  {product.rating.rate} ({product.rating.count})
                </p>
              </div>
            </li>
          ))}
        </ul>

        {currentItems?.length < filteredProducts?.length && (
          <div
            ref={loadMoreRef}
            className="py-4 text-center text-gray-400 text-sm"
          >
            Loading more...
          </div>
        )}
      </div>
    </ColumnsCard>
  );
}
