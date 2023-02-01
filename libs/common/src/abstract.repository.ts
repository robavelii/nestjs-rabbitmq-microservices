import { Logger, NotFoundException } from '@nestjs/common';
import {
  Connection,
  FilterQuery,
  Model,
  SaveOptions,
  Types,
  UpdateQuery,
} from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  constructor(
    protected readonly model: Model<TDocument>,
    private readonly connection: Connection,
  ) {}
  // Create document
  async create(
    document: Omit<TDocument, '_id'>,
    options?: SaveOptions,
  ): Promise<TDocument> {
    const createdDoc = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDoc.save(options)).toJSON() as unknown as TDocument;
  }

  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  // Find one fucntion
  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn(`Document was not found with query: ${filterQuery}`);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }

  //FInd one and update function
  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });
    if (!document) {
      this.logger.warn(`Document was not found with query: ${filterQuery}`);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }

  // Upsert function to add new doucment if no documents found with filter
  async upsert(
    filterQuery: FilterQuery<TDocument>,
    document: Partial<TDocument>,
  ) {
    return this.model.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });
  }

  //Start a transaction
  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}
