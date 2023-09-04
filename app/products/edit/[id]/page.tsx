import Form from "@/app/components/Form";
import getAllCategories from "@/lib/getAllCategories";
import getSingleProduct from "@/lib/getSingleProduct";

const EditProduct = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const categoryData: Promise<CategoryData[]> = getAllCategories();
  const categories = await categoryData;

  const productData: Promise<ProductData> = getSingleProduct(id);

  const singleProduct = await productData;
  console.log(singleProduct);

  return (
    <div className="bg-white p-6 rounded-xl my-4 mr-4 w-full">
      <header>
        <h2 className="text-xl font-semibold text-gray-600 w-fit px-2 py-1 rounded-lg cursor-pointer">
          Edit Product
        </h2>
      </header>
      <Form
        categories={categories}
        category={singleProduct.category}
        _id={singleProduct._id}
        productName={singleProduct.productName}
        description={singleProduct.description}
        price={singleProduct.price}
        images={singleProduct.images}
      />
    </div>
  );
};

export default EditProduct;
