import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/products";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

type Props = {
  params: {
    _id: string;
  };
};

export const POST = async (request: NextRequest) => {
  await mongooseConnect();
  const data: Partial<ProductData> = await request.json();

  const { productName, description, price, category, images } = data;

  const productDoc = await Product.create({
    productName,
    description,
    price,
    category,
    images,
  });
  console.log("cat", category);

  const path = request.nextUrl.searchParams.get("path") || "/";

  revalidatePath(path);

  return NextResponse.json(productDoc);
};

export const PUT = async (request: NextRequest) => {
  // const tag = request.nextUrl.searchParams.get("tag");
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  console.log("mid", id);
  await mongooseConnect();

  const data: Partial<ProductData> = await request.json();
  console.log("pl", { ...data });

  const { productName, description, price, category, images } = data;

  if (!id) return NextResponse.json({ message: "product not found" });

  await Product.findOneAndUpdate(
    {
      _id: id,
    },
    { productName, description, price, category, images }
  );

  const path = request.nextUrl.searchParams.get("path") || "/";

  revalidatePath(path);
  return NextResponse.json(`product ${id} updated`);
};

export const GET = async (request: NextRequest) => {
  await mongooseConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    const product = await Product.findOne({
      _id: id,
    }).populate("category");
    console.log("dt", JSON.stringify(product));

    const path = request.nextUrl.searchParams.get("path") || "/";

    revalidatePath(path);
    return NextResponse.json(product);
  }
  const products: ProductData[] = await Product.find({}).populate("category");
  console.log("dt", JSON.stringify(products));

  const path = request.nextUrl.searchParams.get("path") || "/";

  revalidatePath(path);
  return NextResponse.json(products);
};

export const DELETE = async (request: NextRequest) => {
  const tag = request.nextUrl.searchParams.get("tag");
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  await mongooseConnect();
  console.log("id", id);
  if (!id) return NextResponse.json({ message: "product not found" });
  await Product.deleteOne({
    _id: id,
  });

  const path = request.nextUrl.searchParams.get("path") || "/";

  revalidatePath(path);
  return NextResponse.json(`product ${id} deleted`);
};
