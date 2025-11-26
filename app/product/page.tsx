"use client";

import { useState } from "react";

export default function NewProductPage() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    image_url: "",
    descricao: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        price: Number(form.price),
        image_url: form.image_url,
        descricao: form.descricao,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const text = await res.text();
      setMessage("Erro ao cadastrar: " + text);
      return;
    }

    setMessage("Produto cadastrado com sucesso!");

    // limpa o formulário
    setForm({
      name: "",
      price: "",
      image_url: "",
      descricao: "",
    });
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-lg p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Cadastrar Produto
      </h1>

      {message && (
        <p className="mb-4 text-center font-semibold text-blue-800">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nome */}
        <div>
          <label className="block mb-1 font-medium text-gray-800">Nome do Produto</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300 text-gray-500"
            required
          />
        </div>

        {/* Preço */}
        <div>
          <label className="block mb-1 font-medium text-gray-800">Preço</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring-blue-300 text-gray-500"
            required
          />
        </div>

        {/* URL da imagem */}
        <div>
          <label className="block mb-1 font-medium text-gray-800">URL da Imagem</label>
          <input
            type="text"
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300 text-gray-500"
            required
          />
        </div>

        {/* Descrição */}
        <div>
          <label className="block mb-1 font-medium text-gray-800">Descrição</label>
          <textarea
            name="descricao"
            rows={3}
            value={form.descricao}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300 text-gray-500"
          ></textarea>
        </div>

        {/* Botão */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Cadastrando..." : "Cadastrar Produto"}
        </button>
      </form>
    </div>
  );
}
