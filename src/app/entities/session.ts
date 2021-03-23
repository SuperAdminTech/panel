import { SerializableEntity } from './../base/serializable-entity.base';

export interface ISession {
  token: string;
  expireDate: Date;
}
export class Session implements SerializableEntity, ISession {
  public token: string;
  public expireDate: Date;

  public isActive() {
    if (!this.expireDate) {
      return false;
    }

    const now = Date.now();
    const expires = this.expireDate.getTime();
    const difference = expires - now;
    return difference >= 1000;
  }

  public isExpired() {
    return !this.isActive();
  }

  public setExpireDate(date: Date) {
    this.expireDate = date;
    return this;
  }

  public setToken(token: string) {
    this.token = token;
    return this;
  }

  fromJson(obj: ISession): Session {
    const sess = new Session();
    sess.token = obj.token;
    sess.expireDate = new Date(obj.expireDate);
    return sess;
  }

  toJson(): ISession {
    return {
      token: this.token,
      expireDate: this.expireDate,
    };
  }
}
