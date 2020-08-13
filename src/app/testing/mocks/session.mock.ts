import { Session } from 'src/app/entities/session';

export const MSessionExpired = new Session().setExpireDate(
  new Date('10/6/2019')
);
export const MSessionActive = new Session().setExpireDate(
  new Date('10/6/2020')
);
