import  {prisma}  from "@/lib/prisma";
import { NextResponse } from "next/server";

//Buscar items do cart
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cartId = searchParams.get("cartId");

    if (!cartId) {
      return NextResponse.json({ message: "Nenhum cartId informado" }, { status: 400 });
    }

    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: { include: { product: true } } }
    });

    if (!cart) return NextResponse.json({ items: [], subtotal: 0, total: 0 });

    return NextResponse.json(cart);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar carrinho" }, { status: 500 });
  }
}
//criar carrinho e itens 
export async function POST(request: Request) {
    try {
    // Ler o body da requisição
    const {productId, cartId} = await request.json();
    //criar cart se não existir
    let cart = cartId
      ? await prisma.cart.findUnique({ where: { id: cartId } })
      : null;
    
      if (!cart) {
        cart = await prisma.cart.create({data:{subtotal:0, total:0}});
      }
    //Verifica se o item ja existe no carrinho
    let item = await prisma.cartItem.findFirst({where:{cartId:cart.id, productId}});

    if (item) {
    //Soma quantidade de cartItem
        item = await prisma.cartItem.update({where:{id:item.id},data:{quantity: item.quantity + 1}})    
    }else{
    //Cria um novo cartItem
        item = await prisma.cartItem.create({data: {quantity: 1, productId, cartId: cart.id}});
    }

    //Buscar items e incluir produto no item
    const items = await prisma.cartItem.findMany({where:{cartId: cart.id}, include:{product:true}});
    //Recalcular subtotal e total
    const subtotal = items.reduce((acc, item)=>{
        return acc + item.product.price * item.quantity;
    }, 0);
    const total = subtotal;

    //Atualiza Cart
    const updatedCart = await prisma.cart.update({
        where:{id: cart.id},
        data:{subtotal, total},
        include: { items: { include: { product: true } } }
    });
   
    //Retorna resposta
    return NextResponse.json(updatedCart);

    } catch (error:any) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao adicionar item ao carrinho" }, { status: 500 });
    }
}
