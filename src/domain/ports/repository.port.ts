export interface BaseRepositoryPort {
  /** Queries */
  deleteMany(): void;
  deleteOne(options: any): void;
  find(): void;
  findById(): void;
  findByIdAndDelete(): void;
  findByIdAndRemove(): void;
  findByIdAndUpdate(): void;
  findOne(): void;
  findOneAndDelete(): void;
  findOneAndRemove(): void;
  findOneAndReplace(): void;
  findOneAndUpdate(): void;
  replaceOne(): void;
  updateMany(): void;
  updateOne(): void;
}
