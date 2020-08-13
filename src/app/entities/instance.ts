import { Bot, IBot } from './bot';
import { SerializableEntity } from '../base/serializable-entity.base';
import { Exchange, IExchange } from './exchange';

export interface IInstance {
  id?: string;
  name: string;
  description: string;
  alias: string;
  bot: IBot | Bot;
  exchange: IExchange | Exchange;
  balance: number;
  benefit: number;
  status: string;
  updated_at: string;
  exchange_access_key: string;
  exchange_access_secret: string;
  config: { [key: string]: any };
}

export class Instance implements SerializableEntity, IInstance {
  id: string;
  name: string;
  description: string;
  alias: string;
  bot: IBot | Bot;
  exchange: IExchange | Exchange;
  balance: number;
  benefit: number;
  // tslint:disable-next-line: variable-name
  updated_at: string;
  status: string;
  // tslint:disable-next-line: variable-name
  exchange_access_key: string;
  // tslint:disable-next-line: variable-name
  exchange_access_secret: string;
  config: { [key: string]: any };

  fromJson(obj: IInstance): Instance {
    this.alias = obj.alias;
    this.id = obj.id;
    this.bot = obj.bot;
    this.exchange = obj.exchange;
    this.balance = obj.balance;
    this.benefit = obj.benefit;
    this.status = obj.status;
    this.config = obj.config;
    this.updated_at = obj.updated_at;
    this.exchange_access_key = obj.exchange_access_key;
    this.exchange_access_secret = obj.exchange_access_secret;
    this.exchange_access_secret = obj.exchange_access_secret;
    this.name = obj.name;
    this.description = obj.description;
    return this;
  }

  /* istanbul ignore next */
  toJson(): IInstance {
    return {
      alias: this.alias,
      bot: this.bot,
      name: this.name,
      description: this.description,
      exchange: this.exchange,
      balance: this.balance,
      benefit: this.benefit,
      status: this.status,
      updated_at: this.updated_at,
      exchange_access_key: this.exchange_access_key,
      exchange_access_secret: this.exchange_access_secret,
      config: this.config,
    };
  }
}
