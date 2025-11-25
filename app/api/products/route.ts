import  {prisma}  from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const products = await prisma.product.findMany();
    console.log(products)

    return NextResponse.json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    

    return NextResponse.json(
      { message: "Erro ao buscar produtos", details: error },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
    try {
    // Ler o body da requisição
    const body = await request.json();
    //Criar product
    const product = await prisma.product.create({data: body,});
    //Retorna resposta
    return NextResponse.json(product,{status:201});

    } catch (error:any) {
    // Tratar erro de forma profissional
    return NextResponse.json(
        { message: error.message || "Erro ao criar produto" },
        { status: 500 }
        ); 
    }
    
}
