"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [count, setCount] = useState(0);

  async function updateCartCount() {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) return;

    const res = await fetch(`/api/cart?cartId=${cartId}`);
    const cart = await res.json();

    const totalItems =
      cart.items?.reduce((acc: number, item: any) => acc + item.quantity, 0) ||
      0;

    setCount(totalItems);
  }

  useEffect(() => {
    updateCartCount();
  }, []);

  useEffect(() => {
    const handleUpdate = () => {
      updateCartCount();
    };
    window.addEventListener("cart-updated", handleUpdate);
    return () => window.removeEventListener("cart-updated", handleUpdate);
  }, []);

  return (
    <header className="w-full bg-orange-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          Minha Loja
        </Link>

        {/* Botões à direita da logo */}
        <div className="flex items-center space-x-4">
          <Link href="/product">Cadastrar Produto</Link>

          {/* Botão do carrinho */}
          <Link href="/cart" className="relative text-2xl">
            🛒
            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
