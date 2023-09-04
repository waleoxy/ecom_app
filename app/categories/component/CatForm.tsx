"use client";

import axios from "axios";
import { Trash2Icon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

interface ICatFormProps {
  categories: CategoryData[];
  id: string;
}

interface PropertiesType {
  name: string;
  values: string;
}

const CatForm = ({ categories, id }: ICatFormProps) => {
  const router = useRouter();

  const [catFormData, setCatFormData] = useState({
    categoryName: "",
    parent: "",
  });
  const [properties, setProperties] = useState<PropertiesType[]>([
    { name: "", values: "" },
  ]);

  useEffect(() => {
    setCatFormData({
      categoryName: categories.find((cat) => cat._id === id)
        ?.categoryName as string,
      parent: categories.find((cat) => cat._id === id)?.parent?._id as string,
    });
    setProperties(
      categories
        .find((cat) => cat._id === id)
        ?.properties.map((p) => ({
          name: p.name,
          values: p.values?.toString(),
        })) as PropertiesType[]
    );
  }, [id]);

  const { categoryName, parent } = catFormData;

  console.log(categoryName, parent, properties);

  const addProperty = () => {
    setProperties((prev) => {
      if (properties?.length > 0) {
        return [...prev, { name: "", values: "" }];
      } else {
        return [{ name: "", values: "" }];
      }
    });
  };

  async function saveCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      if (id) {
        const data = await fetch(
          `http://localhost:3000/api/categories?id=${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              categoryName,
              parent,
              properties: properties.map((prop) => ({
                name: prop.name,
                values: prop.values.split(","),
              })),
            }),
          }
        );
        setCatFormData({ categoryName: "", parent: "" });
        setProperties([]);
        router.refresh();
        router.push("/categories");
      } else {
        const data = await fetch("http://localhost:3000/api/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            categoryName,
            parent,
            properties: properties.map((prop) => ({
              name: prop.name,
              values: prop.values.split(","),
            })),
          }),
        });
        setCatFormData({ categoryName: "", parent: "" });
        setProperties([]);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  const handlePropNameChange = (
    index: number,
    property: Property,
    propName: string
  ) => {
    setProperties((prev: any) => {
      const properties = [...prev];
      properties[index].name = propName;
      return properties;
    });
  };

  const handlePropValuesChange = (
    index: number,
    property: Property,
    propValues: string
  ) => {
    setProperties((prev: any) => {
      const properties = [...prev];
      properties[index].values = propValues;
      return properties;
    });
  };

  const removeProperty = (index: number) => {
    setProperties((prev: any) =>
      [...prev].filter((p, pIndex) => pIndex !== index)
    );
  };

  return (
    <form
      onSubmit={saveCategory}
      className="flex flex-col items-start mt-10 w-full">
      <div className="md:flex xs:flex-col justify-between flex-wrap  gap-6 w-full">
        <label className="flex-grow flex-1">
          {id ? (
            <span>Edit Category Name</span>
          ) : (
            <span> New Category Name</span>
          )}
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
            {categories?.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
          </select>
        </label>
      </div>
      <div className="flex flex-col items-start mb-4 w-full">
        <label className="block mb-1">Properties</label>
        <button
          type="button"
          className="custom-btn-props mb-5 text-gray-400"
          onClick={addProperty}>
          Add new property
        </button>
        <div className="w-full h-auto py-2 flex flex-col gap-3 ">
          {properties?.length > 0 &&
            properties.map(
              (property: { name: any; values: any }, index: number) => (
                <div key={`div + ${index}`} className="flex gap-3 items-center">
                  <label className="flex-grow flex-1">
                    Property name
                    <input
                      value={property.name}
                      onChange={(ev) =>
                        handlePropNameChange(index, property, ev.target.value)
                      }
                      className="input"
                      type="text"
                      placeholder="Property name (example: color)"
                    />
                  </label>
                  <label className="flex-grow flex-1">
                    Values
                    <input
                      value={property.values}
                      onChange={(ev) =>
                        handlePropValuesChange(index, property, ev.target.value)
                      }
                      className="input"
                      type="text"
                      placeholder="Values separated with comma"
                    />
                  </label>
                  <Trash2Icon
                    onClick={() => removeProperty(index)}
                    className="text-red-500 mt-4 cursor-pointer"
                  />
                </div>
              )
            )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => (
            setCatFormData({ categoryName: "", parent: "" }),
            setProperties([]),
            router.push("/categories")
          )}
          className={id ? `custom-btn-cancel` : `hidden`}>
          Cancel
        </button>
        <button type="submit" className="custom-btn ">
          Save
        </button>
      </div>
    </form>
  );
};

export default CatForm;
