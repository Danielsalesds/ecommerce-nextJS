async function getProdutos() {
  const res = await fetch("/api/products", {
    cache: "no-store",
  });
  return res.json();
}

export default async function ProdutosPage() {
  const produtos = await getProdutos();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Lista de Produtos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {produtos.map((prod: any) => (
          <div
            key={prod.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">{prod.nome}</h3>
            <p className="text-gray-600">Preço: R$ {prod.preco}</p>

            <button
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
