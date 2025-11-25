"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [count, setCount] = useState(0);

  // Função que atualiza a quantidade do carrinho
  async function updateCartCount() {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) return;

    const res = await fetch(`/api/cart?cartId=${cartId}`);
    const cart = await res.json();

    const totalItems =
      cart.items?.reduce(
        (acc: number, item: any) => acc + item.quantity,
        0
      ) || 0;

    setCount(totalItems);
  }

  // Quando o Navbar montar, faz a primeira carga
  useEffect(() => {
    updateCartCount();
  }, []);

  // Escutar atualizações usando o evento customizado
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
        <Link href="/" className="text-2xl font-bold">
          Minha Loja
        </Link>

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
