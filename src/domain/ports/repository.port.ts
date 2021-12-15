export interface RepositoryPort {
  /** Queries */
  deleteMany(): void;
  deleteOne(): void;
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
