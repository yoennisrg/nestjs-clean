import { Document, Model } from 'mongoose';

export abstract class EntityRepositoryBase<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  // public async create(createEntityData: T): Promise<T> {
  //   const entity = new this.entityModel(createEntityData);
  //   return entity.save();
  // }
}
