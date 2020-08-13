import { SerializableEntity } from '../base/serializable-entity.base';

export interface IExchange {
  name: string;
  icon: string;
}
export class Exchange implements SerializableEntity, IExchange {
  public name: string;
  public icon: string;

  fromJson(obj: IExchange | Exchange): Exchange {
    this.icon = obj.icon;
    this.name = obj.name;
    return this;
  }
}
