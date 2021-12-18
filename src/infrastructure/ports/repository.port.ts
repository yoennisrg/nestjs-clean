export interface BaseRepositoryPort {
  /** Queries */
  save(entity: unknown): Promise<unknown>;
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
  deleteMany(): void;
  deleteOne(options: unknown): Promise<unknown>;
}
