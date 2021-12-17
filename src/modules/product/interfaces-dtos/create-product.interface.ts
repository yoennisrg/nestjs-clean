export interface AttributesProduct {
  size?: string;
  type?: string;
  color?: string;
  gender?: string;
}

export interface CreateProduct {
  name: string;
  description: string;
  attributes: AttributesProduct;
  price: number;
  stock?: boolean;
}
