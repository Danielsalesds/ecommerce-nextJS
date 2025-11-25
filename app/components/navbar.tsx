"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) return;

      fetch(`/api/cart?cartId=${cartId}`)
      .then(res => res.json())
      .then(cart => {
        const totalItems = cart.items?.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0;
        setCount(totalItems);
      });
  }, []);

  return (
    <header className="w-full bg-orange-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">Minha Loja</Link>

        {/* BOTÃO DO CARRINHO */}
        <Link href="/cart" className="text-2xl relative">
          🛒
          {count > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
