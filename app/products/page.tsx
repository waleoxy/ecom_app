import getAllProducts from "@/lib/getAllProducts";
import Link from "next/link";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

const ProductPage = async () => {
  const productData: Promise<ProductData[]> = getAllProducts();

  const products = await productData;

  console.log("prod", products);

  return (
    <div className="bg-white p-6 rounded-xl my-4 mr-4 w-full">
      <header>
        <h2 className="text-lg text-teal-500 w-fit border border-gray-300 px-2 py-1 rounded-lg cursor-pointer">
          <Link href="/products/new-product">Add New Product</Link>
        </h2>
      </header>

      <DataTable columns={columns} data={products} />
    </div>
  );
};

export default ProductPage;
