export interface Attributes {
  size: string;
  type: string;
  color: string;
  gender: string;
}

export interface CreateFile {
  name: string;
  description: string;
  attributes: Attributes;
  price: number;
  stock?: boolean;
}
