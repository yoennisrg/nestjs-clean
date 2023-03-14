export class CreateFileCommand {
  constructor(props: CreateFileCommand) {
    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.stock = props.stock;
  }

  readonly name: string;

  readonly description: string;

  readonly price: number;

  readonly stock?: boolean;
}
