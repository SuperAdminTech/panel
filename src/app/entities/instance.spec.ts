import { Instance, IInstance } from './instance';
import { Bot } from './bot';
import { Exchange } from './exchange';

describe('Instance', () => {
  it('should create an instance', () => {
    expect(new Instance()).toBeTruthy();
  });

  it('Instance.fromJson(json)', () => {
    const data: IInstance = {
      alias: 'test',
      bot: new Bot(),
      exchange: new Exchange(),
      balance: 20,
      updated_at: '10/6/2020',
      benefit: 300,
      status: 'ok',
      exchange_access_key: 'key',
      exchange_access_secret: 'secret',
      config: {},
    };

    const instance = new Instance().fromJson(data);

    expect(instance.alias).toEqual(data.alias);
    expect(instance.bot).toEqual(data.bot);
    expect(instance.exchange).toEqual(data.exchange);
    expect(instance.balance).toEqual(data.balance);
    expect(instance.benefit).toEqual(data.benefit);
    expect(instance.status).toEqual(data.status);
    expect(instance.exchange_access_key).toEqual(data.exchange_access_key);
    expect(instance.exchange_access_secret).toEqual(
      data.exchange_access_secret
    );
    expect(instance.config).toEqual(data.config);
  });
});
