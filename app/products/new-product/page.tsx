import Form from "@/components/Form";

const NewProduct = () => {
  return (
    <div className="bg-white p-6 rounded-xl my-4 mr-4 w-full">
      <header>
        <h2 className="text-xl font-semibold text-gray-600 w-fit px-2 py-1 rounded-lg cursor-pointer">
          New Product
        </h2>
      </header>
      <Form />
    </div>
  );
};

export default NewProduct;
