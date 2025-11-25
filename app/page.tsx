import ProductGrid from "./components/ProductGrid";

async function getProdutos() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  return res.json();
}

export default async function Home() {
  const produtos = await getProdutos();

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Produtos em Destaque</h1>

      <ProductGrid produtos={produtos} />
    </div>
  );
}
