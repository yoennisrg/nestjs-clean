import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export interface DeleteResult {
  acknowledged: boolean;
  deletedCount: number;
}

export abstract class BaseRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  /** save method */

  async save(entity: any): Promise<T> {
    return await new this.entityModel(entity).save();
  }

  /** update method */

  /** find method */
  async find(entityFilterQuery: FilterQuery<T>): Promise<T[] | null> {
    return await this.entityModel.find(entityFilterQuery);
  }

  /** findOne method */

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return await this.entityModel
      .findOne(entityFilterQuery, {
        _id: 0,
        _v: 0,
        ...projection,
      })
      .exec();
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return await this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      {
        new: true,
      },
    );
  }

  /** delete method */

  async deleteOne(entityFilterQuery: FilterQuery<T>): Promise<DeleteResult> {
    return await this.entityModel.deleteOne(entityFilterQuery);
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<DeleteResult> {
    return await this.entityModel.deleteMany(entityFilterQuery);
  }

  /** replace method */
}
