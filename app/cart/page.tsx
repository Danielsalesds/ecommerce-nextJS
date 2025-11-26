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
  //Remover cartItem de cart
  async function removeItem(cartItemId: string) {
    const res = await fetch(`/api/cart?cartItemId=${cartItemId}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        console.error("Erro ao deletar item:", await res.text());
        return;
    }
    const data = await res.json();
    console.log(data);

    // Atualiza o estado local do carrinho
  setCart((prev: any) => {
    if (!prev) return prev;

    let newItems;

    if (data.updatedItem) {
      // Atualiza quantidade
      newItems = prev.items.map((item: any) =>
        item.id === cartItemId
          ? { ...item, quantity: data.updatedItem.quantity }
          : item
      );
    }

    if (!data.updatedItem || data.updatedItem.quantity === 0) {
      // REMOVE DO ARRAY
      newItems = prev.items.filter((item: any) => item.id !== cartItemId);
    }

    // Recalcular subtotal e total no front
    const newSubtotal = newItems.reduce(
      (acc: number, item: any) => acc + item.quantity * item.product.price,
      0
    );
    // Atualiza localStorage → Navbar vai reagir automaticamente
    //localStorage.setItem("cartCount", String(data.updatedItem.quantity));
    window.dispatchEvent(new Event("cart-updated"));


    return {
      ...prev,
      items: newItems,
      subtotal: newSubtotal,
      total: newSubtotal,
    };
  });

    
}
//adicionar subItem
async function addToCart(productId: string) {
  const cartId = localStorage.getItem("cartId");

  const res = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, cartId }),
  });

  const data = await res.json();

  // Salva id do carrinho
  localStorage.setItem("cartId", data.id);

  // Atualiza o estado do carrinho local
  setCart((prev: any) => {
    if (!prev) return data; // se estava vazio, define tudo

    let newItems;

    const existing = prev.items.find((i: any) => i.product.id === productId);

    if (existing) {
      // Se o item JÁ existe, só aumenta a quantity
      newItems = prev.items.map((item: any) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // Se o item NÃO existia, adiciona no array
      newItems = [...prev.items, { ...data.newItem }];
    }

    const newSubtotal = newItems.reduce(
      (acc: number, it: any) => acc + it.quantity * it.product.price,
      0
    );

    return {
      ...prev,
      items: newItems,
      subtotal: newSubtotal,
      total: newSubtotal,
    };
  });

  window.dispatchEvent(new Event("cart-updated"));
}



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
            <img
              src={item.product.image_url}
              alt={item.product.name}
              className="w-20 h-20 object-cover rounded mr-4 bg-zinc-200"
              onError={(e) => {
                e.currentTarget.onerror = null; 
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
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
                onClick={() => removeItem(item.id)}
            >
                -
            </button>
            <span className="px-4 py-1 text-gray-700">{item.quantity}</span>
            <button
                className="px-3 py-1 bg-white text-black font-bold hover:bg-gray-100 transition"
                onClick={() => addToCart(item.product.id)}
            >
                +
            </button>
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
