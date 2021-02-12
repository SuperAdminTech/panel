import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { CasteUserService, InternalPermission } from '@qbitartifacts/caste-client-ng';

// This directive should manage wether certain components/elements are shouwn/disabled based on some permissions
@Directive({
  selector: '[appPermissions]',
})
export class PermissionsDirective {
  public permitted = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private user$: CasteUserService
  ) {}

  @Input('appPermissions') set appPermissions(perm: InternalPermission) {
    if (this.user$.hasUser() && perm.canActivate(this.user$.user)) {
      this.permitted = true;
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.permitted = false;
      this.viewContainer.clear();
    }
  }
}
