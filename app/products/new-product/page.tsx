"use client";

import Form from "@/app/components/Form";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NewProduct = () => {
  const [goto, setGoto] = useState(false);
  const router = useRouter();

  console.log("gt", goto);
  if (goto) {
    router.push("/products");
  }

  return (
    <div className="bg-white p-6 rounded-xl my-4 mr-4 w-full">
      <header>
        <h2 className="text-xl font-semibold text-teal-600 w-fit px-2 py-1 rounded-lg">
          Create New Product
        </h2>
      </header>
      <Form _id={""} productName={""} description={""} price={0} images={[]} />
    </div>
  );
};

export default NewProduct;
