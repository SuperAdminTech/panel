Permission class is used to manage user permissions.
It checks wether a user can view/interact with some other parts of the system.

Currently there are a couple of permissions (in herarchycal order):

- PermissionAdmin - Admin permissions, must have role admin
- PermissionUser - Default permission, user by default has this permission
- PermissionReadOnly - Read only permission, if role READONLY is set, can only read stuff
