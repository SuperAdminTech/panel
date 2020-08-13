export class Role {
  private roleString: string;
  private subroles: Role[];
  public className = '';

  constructor(
    roleString: string,
    subroles: Role[] = [],
    className: string = ''
  ) {
    this.roleString = roleString;
    this.subroles = subroles;
    this.className = className;
  }

  valueOf() {
    return this.roleString;
  }

  get name() {
    return this.roleString;
  }

  public is(role: Role | string) {
    if (role instanceof Role) {
      return this.roleString === role.roleString;
    }

    return this.roleString === role;
  }

  public includes(role: Role): boolean {
    return this.subroles.includes(role);
  }

  public supports(role: Role): boolean {
    return this.is(role) || this.includes(role);
  }
}
