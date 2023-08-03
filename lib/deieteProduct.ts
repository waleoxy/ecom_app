const deleteProduct = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/products?id=${id}`, {
    method: "DELETE",
    next: { revalidate: 5 },
  });

  return res.json();
};

export default deleteProduct;
