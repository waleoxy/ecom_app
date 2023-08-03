const getSingleProduct = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/products?id=${id}`, {
    next: { revalidate: 5 },
  });
  // if (res.ok) {
  //   throw new Error("Data fetching failed");
  // }

  return res.json();
};

export default getSingleProduct;
