import ProductGrid from "./components/ProductGrid";

async function getProdutos() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/products`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function Home() {
  const produtos = await getProdutos();

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Produtos em Destaque</h1>

      <ProductGrid produtos={produtos} />
    </div>
  );
}
