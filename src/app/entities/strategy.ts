import { SerializableEntity } from '../base/serializable-entity.base';

export interface IStrategy {
  name: string;
  description: string;
  id?: string;
  created_at?: string;
  updated_at?: string;
}

export class Strategy implements SerializableEntity, IStrategy {
  public name: string;
  public description: string;
  public id: string;
  public created_at: string;
  public updated_at: string;

  fromJson(obj: IStrategy | Strategy): Strategy {
    this.description = obj.description;
    this.id = obj.id;
    this.created_at = obj.created_at;
    this.updated_at = obj.updated_at;
    return this;
  }
}
