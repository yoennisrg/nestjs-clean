export interface AttributeProduct {
  size?: string;
  type?: string;
  color?: string;
  gender?: string;
}

export interface CreateProduct {
  name: string;
  description: string;
  attributes: AttributeProduct;
  price: number;
  stock?: boolean;
}
