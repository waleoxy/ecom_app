import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { CategoryData } from "@/type";
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

  const categories: CategoryData[] = await Category.find().populate("parent");
  console.log("dt", JSON.stringify(categories));

  const path = request.nextUrl.searchParams.get("path") || "/";

  revalidatePath(path);
  return NextResponse.json(categories);
};
