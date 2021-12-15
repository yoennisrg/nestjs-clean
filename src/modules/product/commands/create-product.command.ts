import { AttributeProduct } from '../interface/product.interface';

export class CreateProductCommand {
  constructor(props: CreateProductCommand) {
    this.name = props.name;
    this.description = props.description;
    this.attributes = props.attributes;
    this.price = props.price;
    this.stock = props.stock;
  }

  readonly name: string;

  readonly description: string;

  readonly attributes: AttributeProduct;

  readonly price: number;

  readonly stock?: boolean;
}
