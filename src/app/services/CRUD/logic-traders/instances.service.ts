import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudBaseService } from '../../../base/crud.base.service';
import { AuthService } from '../../auth.service';
import { IInstance } from 'src/app/entities/instance';

@Injectable({
  providedIn: 'root',
})
export class InstancesService extends CrudBaseService<IInstance> {
  constructor(http: HttpClient, auth: AuthService) {
    super(
      {
        endpoint: 'instances',
      },
      http,
      auth
    );
  }
}
