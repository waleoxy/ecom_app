"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

interface ICatFormProps {
  categories: CategoryData[];
  id: string;
}

const CatForm = ({ categories, id }: ICatFormProps) => {
  const router = useRouter();

  const [catFormData, setCatFormData] = useState({
    categoryName: "",
    parent: "",
  });

  useEffect(() => {
    const category = categories.find((item) => item._id === id);
    setCatFormData({
      categoryName: category?.categoryName as string,
      parent: category?.parent?._id as string,
    });
  }, [id]);

  const { categoryName, parent } = catFormData;

  async function saveCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("iiddd", id);
    console.log("catss", categoryName, parent);
    if (id) {
      const data = await fetch(
        `http://localhost:3000/api/categories?id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ categoryName, parent }),
        }
      );
      setCatFormData({ categoryName: "", parent: "" });
      router.refresh();
      router.push("/categories");
    } else {
      const data = await fetch("http://localhost:3000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryName, parent }),
      });
      setCatFormData({ categoryName: "", parent: "" });
      router.refresh();
    }
  }

  return (
    <form
      onSubmit={saveCategory}
      className="md:flex xs:flex-col justify-between flex-wrap mt-8 gap-6 w-full">
      <label className="flex-grow flex-1">
        {id ? <span>Edit Category Name</span> : <span>New Category Name</span>}
        <input
          type="text"
          className="cat-input mb-10"
          value={categoryName}
          onChange={(e) =>
            setCatFormData({ ...catFormData, categoryName: e.target.value })
          }
          placeholder="Category name"
        />
      </label>
      <label className="flex-grow flex-1">
        {id ? `Edit Parent Category` : `Parent Category`}
        <select
          className="cat-select"
          value={parent}
          name="parent"
          placeholder="Category name"
          onChange={(e) =>
            setCatFormData({ ...catFormData, parent: e.target.value })
          }>
          <option>No Category</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.categoryName}
              </option>
            ))}
        </select>
      </label>

      <button type="submit" className="custom-btn flex-grow-0">
        Save
      </button>
    </form>
  );
};

export default CatForm;
