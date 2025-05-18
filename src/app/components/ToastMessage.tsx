"use client";

import { useEffect, useState } from "react";

export default function ToastMessage({ message }: { message: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-white  text-stone-600 px-4 py-2 rounded shadow-lg z-50 backdrop-blur-sm">
      {message}
    </div>
  );
}
