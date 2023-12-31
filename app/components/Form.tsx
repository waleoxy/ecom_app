"use client";

import { Cross1Icon } from "@radix-ui/react-icons";
import axios from "axios";
import { UploadIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import LoadingSpinner from "./LoadingSpinner";

interface IFormProps {
  _id: string;
  productName: string;
  description: string;
  price: number;
  category: CategoryData;
  categories: CategoryData[];
  images: string[];
}

interface Props {
  name: string | undefined;
  values: string | undefined;
}

const Form = ({
  _id,
  productName: existingProdName,
  description: existingProdDesc,
  price: existingprodPrice,
  category: existingCat,
  images: existingImages,
  categories,
}: IFormProps) => {
  const [formData, setFormData] = useState({
    productName: existingProdName || "",
    description: existingProdDesc || "",
    price: existingprodPrice || 0,
    category: existingCat._id || "",
    images: existingImages || [],
  });

  const [goToProductPage, setGoToProductPage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [productProps, setProductProps] = useState<Props>({
    name: "",
    values: "",
  });

  const router = useRouter();

  const { productName, description, price, category, images } = formData;
  console.log("catCl", category);

  const createProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { productName, description, price, category, images } = formData;

    console.log("catCl", category);

    try {
      if (_id) {
        const data = await fetch(
          `http://localhost:3000/api/products?id=${_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              productName,
              description,
              price,
              category,
              images,
              productProps,
            }),
          }
        );

        setGoToProductPage(true);
      } else {
        const data = await fetch("http://localhost:3000/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productName,
            description,
            price,
            category,
            images,
            productProps,
          }),
        });
        setGoToProductPage(true);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsloading(true);
    const files = Array.from(e.target?.files as Iterable<File>);

    if (files !== null && files.length > 0) {
      // if (!files) return;
      try {
        const data = new FormData();
        for (const file of files) {
          data.append("file", file);
        }

        const res = await axios.post("/api/upload", data);
        // handle the error

        console.log("dt", res.data.links);

        setFormData({ ...formData, images: [...images, ...res.data.links] });

        setIsloading(false);
      } catch (e: any) {
        // Handle errors here
        console.error(e);
      }
    }
  };

  if (goToProductPage) {
    router.refresh();
    router.push("/products");
  }

  function deleteImage(index: number): void {
    const newImages = images.filter((img) => img !== images[index]);
    setFormData({ ...formData, images: [...newImages] });
  }

  let propertiesToFill = [];

  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    if (catInfo) {
      let ct = catInfo?.properties.map((p) => ({
        name: p.name,
        values: p.values?.toString(),
      }));
      propertiesToFill.push(...ct);
    }
    console.log("cat", categories);

    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      if (parentCat) {
        let ct = parentCat?.properties.map((p) => ({
          name: p.name,
          values: p.values?.toString(),
        }));
        propertiesToFill.push(...ct);
      }
      catInfo = parentCat;
    }
  }

  console.log("propf", propertiesToFill);

  const handleChangeProdProps = (propName: string, value: string) => {
    setProductProps((prev: any) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  };

  return (
    <form onSubmit={createProduct} className="flex flex-col p-1 mt-5 gap-10">
      <label className="flex flex-col gap-2 mb-0 text-gray-400">
        Product Name
        <input
          type="text"
          placeholder="Product name"
          className="input"
          name="productName"
          value={productName}
          onChange={(e) =>
            setFormData({ ...formData, productName: e.target.value as string })
          }
        />
      </label>
      <label className="flex flex-col gap-2 mb-0 text-gray-400">
        Category Name
        <select
          className="cat-select"
          value={category}
          name="parent"
          placeholder="Category name"
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }>
          <option>No category</option>
          {categories?.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.categoryName}
              </option>
            ))}
        </select>
      </label>
      {propertiesToFill.length > 0 &&
        propertiesToFill.map((prop, idx) => (
          <div key={idx} className="flex items-center pl-2 text-gray-500 gap-1">
            <div>{prop.name}</div>
            <select
              value={productProps[prop.name as keyof Props]}
              onChange={(e) => handleChangeProdProps(prop.name, e.target.value)}
              className="cat-select">
              {prop.values?.split(",").map((val) => (
                <option value={val}>{val}</option>
              ))}
            </select>
          </div>
        ))}
      <div className="flex flex-wrap gap-2 h-auto">
        {" "}
        <label className="flex gap-3 items-center mt-0 text-gray-400 ">
          <div className="flex items-center gap-1 cursor-pointer">
            <UploadIcon />
            <span>Photo</span>
            <input type="file" multiple hidden onChange={uploadImage} />
          </div>
        </label>
        <aside className=" flex flex-wrap gap-1 h-[100ox]">
          {!!images?.length &&
            images.map((link, i) => (
              <div className="relative">
                <Image
                  key={link}
                  src={link}
                  alt=""
                  height={70}
                  width={160}
                  className="object-fill rounded-lg h-[100px]"
                />{" "}
                <span className="absolute top-1 bg-slate-100 cursor-pointer right-1 rounded-full p-1">
                  <Cross1Icon onClick={() => deleteImage(i)} />
                </span>
              </div>
            ))}
          {isLoading && (
            <div className="flex   items-center justify-center">
              <LoadingSpinner />
            </div>
          )}
        </aside>
      </div>

      <label className="flex flex-col gap-2 text-gray-400">
        Description
        <textarea
          rows={6}
          placeholder="Description"
          className="textarea"
          name="description"
          value={description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
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
          onChange={(e) =>
            setFormData({ ...formData, price: parseInt(e.target.value) })
          }
        />
      </label>

      <button type="submit" className="custom-btn">
        Save
      </button>
    </form>
  );
};

export default Form;
