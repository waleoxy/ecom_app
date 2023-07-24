"use client";

import Form from "@/components/Form";
import Link from "next/link";

const ProductPage = () => {
  return (
    <div className="bg-white p-6 rounded-xl my-4 mr-4 w-full">
      <header>
        <h2 className="text-lg text-blue-500 w-fit border border-gray-300 px-2 py-1 rounded-lg cursor-pointer">
          <Link href="/products/new-product">Add New Product</Link>
        </h2>
      </header>
    </div>
  );
};

export default ProductPage;
