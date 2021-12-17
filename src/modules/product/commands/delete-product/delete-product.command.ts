export class DeleteProductCommand {
  constructor(id: string) {
    this.id = id;
  }

  readonly id: string;
}
