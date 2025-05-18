"use client"
import { ReactNode } from "react";

interface ColumnProps {
  children: ReactNode;
  header?: ReactNode;
}

export default function ColumnsCard({ children, header }: ColumnProps) {
  return (
    <div className="bg-white p-4 rounded shadow w-full flex flex-col">
      {header && <h2 className="text-md font-medium mb-4">{header}</h2>}
      <div>{children}</div>
    </div>
  );
}
