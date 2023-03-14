import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BaseRepository,
  DeleteResult,
} from '../../../infrastructure/database/base.repository';
import { File, FileDocument } from '../database/file.entity';

@Injectable()
export class FileRepository extends BaseRepository<FileDocument> {
  constructor(
    @InjectModel(File.name)
    private readonly fileModel: Model<FileDocument>,
  ) {
    super(fileModel);
  }

  async findOneByNameOrThrow(name: string): Promise<File> {
    const file = await this.findOne({ name: name });
    if (!file) {
      throw new NotFoundException(`No File with that id was found: ${name}`);
    }
    return file;
  }

  async findOneByIdOrThrow(id: string): Promise<File> {
    const file = await this.findOne({ id });
    if (!file) {
      throw new NotFoundException(`${id} does not exist`);
    }
    return file;
  }

  async create(file: File): Promise<number> {
    const { _id } = await this.save(file);
    return _id;
  }

  async exists(filters: unknown): Promise<boolean> {
    return Boolean(await this.findOne(filters));
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.deleteOne({ _id: new Types.ObjectId(id) });
  }
}
