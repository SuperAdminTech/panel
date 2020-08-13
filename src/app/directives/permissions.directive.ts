import { UserService } from './../services/user.service';
import { Permission } from 'src/app/entities/permission';
import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

// This directive should manage wether certain components/elements are shouwn/disabled based on some permissions
@Directive({
  selector: '[appPermissions]',
})
export class PermissionsDirective {
  public permitted = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private user$: UserService
  ) {}

  @Input('appPermissions') set appPermissions(perm: Permission) {
    if (this.user$.hasUser() && perm.canActivate(this.user$.user)) {
      this.permitted = true;
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.permitted = false;
      this.viewContainer.clear();
    }
  }
}
