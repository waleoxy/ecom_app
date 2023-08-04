type ProductData = {
  _id: string;
  productName: string;
  description: string;
  price: number;
  category: {
    _id: string;
    categoryName: string;
  };
  images: string[];
};

type CategoryData = {
  _id: string;
  categoryName: string;
  parent: {
    _id: string;
    categoryName: string;
  };
};
