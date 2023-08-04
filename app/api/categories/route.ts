import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  await mongooseConnect();

  const data: Partial<CategoryData> = await request.json();

  const { categoryName, parent } = data;
  console.log("pl", { categoryName, parent });
  const categoryDoc = await Category.create({ categoryName, parent });

  const path = request.nextUrl.searchParams.get("path") || "/";

  revalidatePath(path);
  return NextResponse.json(categoryDoc);
};

export const GET = async (request: NextRequest) => {
  await mongooseConnect();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    const category = await Category.findOne({
      _id: id,
    }).populate("parent");
    console.log("dt", JSON.stringify(Category));

    const path = request.nextUrl.searchParams.get("path") || "/";

    revalidatePath(path);
    return NextResponse.json(category);
  }

  const categories: CategoryData[] = await Category.find().populate("parent");

  const path = request.nextUrl.searchParams.get("path") || "/";

  revalidatePath(path);
  return NextResponse.json(categories);
};

export const PUT = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  console.log("idser", id);

  await mongooseConnect();

  const data: Partial<CategoryData> = await request.json();

  const { categoryName, parent } = data;

  if (!id) return NextResponse.json({ message: "Category not found" });
  await Category.findOneAndUpdate(
    {
      _id: id,
    },
    { categoryName, parent }
  );

  const path = request.nextUrl.searchParams.get("path") || "/";

  revalidatePath(path);
  return NextResponse.json(`product ${id} updated`);
};

export const DELETE = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  await mongooseConnect();

  if (!id) return NextResponse.json({ message: "Category not found" });
  await Category.deleteOne({
    _id: id,
  });

  const path = request.nextUrl.searchParams.get("path") || "/";

  revalidatePath(path);
  return NextResponse.json(`Category ${id} deleted`);
};
