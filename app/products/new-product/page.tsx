import Form from "@/app/components/Form";
import getAllCategories from "@/lib/getAllCategories";

const NewProduct = async () => {
  const categoryData: Promise<CategoryData[]> = getAllCategories();
  const categories = await categoryData;
  return (
    <div className="bg-white p-6 rounded-xl my-4 mr-4 w-full">
      <header>
        <h2 className="text-xl font-semibold text-teal-600 w-fit px-2 py-1 rounded-lg">
          Create New Product
        </h2>
      </header>
      <Form
        _id={""}
        productName={""}
        description={""}
        price={0}
        images={[]}
        category={{
          _id: "",
          categoryName: "",
        }}
        categories={categories}
      />
    </div>
  );
};

export default NewProduct;
