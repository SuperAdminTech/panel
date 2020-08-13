import { Role } from './role';

describe('Role', () => {
  it('should create an instance with just the string', () => {
    expect(new Role('TEST_ROLE')).toBeTruthy();
  });

  it('should create an instance with subroles', () => {
    expect(new Role('TEST_ROLE', [new Role('SUB_ROLE')])).toBeTruthy();
  });
});
