"use client"

import React, { ReactNode } from "react";

interface Wrapper {
  children: ReactNode;
  header?: ReactNode;
}

export default function ColumnWrapper({ children, header }: Wrapper) {
  return (
    <main className="mx-auto p-6 my-8 shadow-md max-w-6xl w-full  flex  flex-col">
      {header && (
        <header className="text-xl font-bold border-b border-b-stone-200 mb-8 leading-14">
          {header}
        </header>
      )}
      <section className="w-full">{children}</section>
    </main>
  );
}
