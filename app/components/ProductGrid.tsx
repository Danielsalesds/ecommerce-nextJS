"use client";

type Props = {
  produtos: any[];
};

export default function ProductGrid({ produtos }: Props) {
  async function addToCart(productId: string) {
    const cartId = localStorage.getItem("cartId");

    const res = await fetch("http://localhost:3000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, cartId }),
    });

    const cart = await res.json();
    localStorage.setItem("cartId", cart.id);

    console.log("Carrinho atualizado:", cart);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {produtos.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow hover:shadow-lg transition p-4"
        >
          <div className="w-full h-40 bg-zinc-200 rounded mb-4" />

          <h3 className="font-semibold text-lg mb-2">{item.name}</h3>

          <p className="text-zinc-700 font-bold text-xl mb-2">
            R$ {item.price}
          </p>

          <button
            onClick={() => addToCart(item.id)}
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      ))}
    </div>
  );
}
