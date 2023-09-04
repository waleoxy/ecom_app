type ProductData = {
  _id: string;
  productName: string;
  description: string;
  price: number;
  category: Partial<CategoryData>;
  properties: Property[];
  images: string[];
};

type CategoryData = {
  _id: string;
  categoryName: string;
  parent: {
    _id: string;
    categoryName: string;
  };
  properties: Property[];
};

type Property = {
  name: string;
  values?: string[];
};
