"use client";

import axios from "axios";
import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";

interface FormData {
  productName: string;
  description: string;
  price: number;
}

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    description: "",
    price: 0,
  });
  const { productName, description, price } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("e", { [e.target.name]: e.target.value });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createProduct = async () => {
    console.log("data", formData);
    const { data } = await axios.post("/api/products", formData);
    console.log("dt", data);
  };

  return (
    <form onSubmit={createProduct} className="flex flex-col p-1 mt-5 gap-10">
      <label className="flex flex-col gap-2 text-gray-400">
        Product name
        <input
          type="text"
          placeholder="Product name"
          className="input"
          name="productName"
          value={productName}
          onChange={handleChange}
        />
      </label>
      <label className="flex flex-col gap-2 text-gray-400">
        Description
        <textarea
          placeholder="Description"
          className="textarea"
          name="description"
          value={description}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label className="flex flex-col gap-2 text-gray-400">
        Price
        <input
          type="number"
          placeholder="Price"
          className="input"
          name="price"
          value={price}
          onChange={handleChange}
        />
      </label>

      <button type="submit" className="custom-btn">
        Save
      </button>
    </form>
  );
};

export default Form;
