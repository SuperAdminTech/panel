import { Bot, IBot } from './bot';

describe('Bot', () => {
  it('should create an instance', () => {
    expect(new Bot()).toBeTruthy();
  });

  it('Session.fromJson(json)', () => {
    const data: IBot = {
      name: 'test',
      id: '',
      description: 'test',
      type: 'something',
      config: {
        prop: 1243,
      },
    };
    const session = new Bot().fromJson(data);

    expect(session.name).toEqual(data.name);
    expect(session.description).toEqual(data.description);
    expect(session.type).toEqual(data.type);
    expect(session.config).toEqual(data.config);
  });
});
