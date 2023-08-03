const getAllCategories = async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
    next: { revalidate: 5 },
  });
  // if (res.ok) {
  //   throw new Error("Data fetching failed");
  // }

  return res.json();
};

export default getAllCategories;
