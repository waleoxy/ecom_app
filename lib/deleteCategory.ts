const deleteCategory = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/categories?id=${id}`, {
    method: "DELETE",
    next: { revalidate: 5 },
  });

  return res.json();
};

export default deleteCategory;
