"use client"
import { ReactNode } from "react";

interface ColumnGrid {
  children: ReactNode;
}
export default function ColumnsGrid({ children }: ColumnGrid) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {children}
    </div>
  );
}
