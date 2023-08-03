import getAllCategories from "@/lib/getAllCategories";
import { DataTable } from "../products/components/data-table";
import CatForm from "./component/CatForm";
import { columns } from "./component/cat-coumns";

const CategoriesPage = async () => {
  const categoryData: Promise<CategoryData[]> = getAllCategories();

  const categories = await categoryData;

  console.log("cat", categories);

  return (
    <div className="flex flex-col bg-white p-6 rounded-xl my-4 mr-4 w-full h-full">
      <header>
        <h2 className="text-lg text-teal-500 w-fit border border-gray-300 px-2 py-1 rounded-lg">
          Categories
        </h2>
      </header>

      <CatForm categories={categories} />

      <DataTable columns={columns} data={categories} />
    </div>
  );
};

export default CategoriesPage;