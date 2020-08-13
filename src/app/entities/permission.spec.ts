import { MUserUser } from './../testing/mocks/users.mock';
import { Permission } from './permission';

describe('Permission', () => {
  it('should create an instance', () => {
    expect(new Permission('test')).toBeTruthy();
  });

  it('canActivate false by default', () => {
    expect(new Permission('test').canActivate(MUserUser)).toBe(false);
  });
});
