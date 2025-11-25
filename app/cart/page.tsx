"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState<any>(null);

  useEffect(() => {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) return;

    fetch(`/api/cart?cartId=${cartId}`)
      .then(res => res.json())
      .then(setCart);
  }, []);

  if (!cart) return <p className="text-center mt-10 text-gray-500">Carregando...</p>;

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Seu Carrinho</h1>

      {cart.items.length === 0 && (
        <p className="text-center text-gray-600">Seu carrinho está vazio.</p>
      )}

      <div className="space-y-4">
        {cart.items.map((item: any) => (
          <div key={item.id} className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">{item.product.name}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {item.quantity}x R$ {item.product.price.toFixed(2)}
              </p>
            </div>
            <p className="text-lg font-bold text-gray-900 mt-2 md:mt-0">
              R$ {(item.product.price * item.quantity).toFixed(2)}
            </p>
            {/* Botões + e - à esquerda */}
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden ml-4">
            <button
                className="px-3 py-1 bg-white text-black font-bold hover:bg-gray-100 transition"
            >
                -
            </button>
            <span className="px-4 py-1 text-gray-700">{item.quantity}</span>
            <Link href="/" className="px-3 py-1 bg-white text-black font-bold hover:bg-gray-100 transition" > + </Link>
            </div>

            
          </div>
        ))}
        
      </div>
      

      <div className="mt-8 text-right">
        <p className="text-2xl font-bold text-gray-900">Total: R$ {cart.total.toFixed(2)}</p>
      </div>
    </div>
  );
}
