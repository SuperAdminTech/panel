import { SerializableEntity } from '../base/serializable-entity.base';

export interface IBot {
  id: string;
  name: string;
  description: string;
  type: string;
  currency?: string;
  config?: { [key: string]: any };
}
export class Bot implements SerializableEntity, IBot {
  static DEFAULT_CURRENCY = 'EUR';

  public id: string;
  public name: string;
  public description: string;
  public type: string;
  public currency = 'EUR';
  public config: { [key: string]: any };

  fromJson(obj: IBot | Bot): Bot {
    const bot = new Bot();
    bot.id = obj.id;
    bot.name = obj.name;
    bot.currency = obj.currency || Bot.DEFAULT_CURRENCY;
    bot.description = obj.description;
    bot.type = obj.type;
    bot.config = obj.config;
    return bot;
  }
}
