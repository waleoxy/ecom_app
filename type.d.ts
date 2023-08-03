type ProductData = {
  _id: string;
  productName: string;
  description: string;
  price: number;
  images: string[];
};

type CategoryData = {
  _id: string;
  categoryName: string;
  parent: string;
};
