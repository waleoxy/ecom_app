import Form from "@/app/components/Form";
import getSingleProduct from "@/lib/getSingleProduct";

const EditProduct = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log("id", id);

  const productData: Promise<ProductData> = getSingleProduct(id);

  console.log("sP", await productData);
  const singleProduct = await productData;

  console.log("sP", singleProduct);

  return (
    <div className="bg-white p-6 rounded-xl my-4 mr-4 w-full">
      <header>
        <h2 className="text-xl font-semibold text-gray-600 w-fit px-2 py-1 rounded-lg cursor-pointer">
          Edit Product
        </h2>
      </header>
      <Form {...singleProduct} />
    </div>
  );
};

export default EditProduct;
