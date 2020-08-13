import { Session, ISession } from './session';

describe('Session', () => {
  it('should create an instance', () => {
    expect(new Session()).toBeTruthy();
  });

  it('should handle not expired correctly', () => {
    const session = new Session();
    session.expireDate = new Date('10/6/2020');

    expect(session.isActive()).toBeTruthy();
  });

  it('should handle expired correctly', () => {
    const session = new Session();
    session.expireDate = new Date('4/6/2020');

    expect(session.isExpired()).toBeTruthy();
  });

  it('.setExpireDate should work', () => {
    const session = new Session();

    const date = new Date('4/6/2020');
    session.setExpireDate(date);

    expect(session.expireDate).toBe(date);
  });

  it('if no expiry date, should be expired', () => {
    const session = new Session();
    expect(session.isExpired()).toBeTruthy();
  });

  it('Session.fromJson(json)', () => {
    const data: ISession = {
      token: 'token',
      expireDate: new Date(),
    };
    const session = new Session().fromJson(data);

    expect(session.token).toEqual(data.token);
    expect(session.expireDate).toEqual(data.expireDate);
  });

  it('Session.toJson()', () => {
    const data: ISession = {
      token: 'token',
      expireDate: new Date(),
    };
    const session = new Session().fromJson(data);
    const dataFrom = session.toJson();

    expect(dataFrom.token).toEqual(data.token);
    expect(dataFrom.expireDate).toEqual(data.expireDate);
  });
});
