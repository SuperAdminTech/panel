import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudBaseService } from '../../../base/crud.base.service';
import { IStrategy } from 'src/app/entities/strategy';
import { AuthService } from '../../auth.service';

@Injectable({
  providedIn: 'root',
})
export class StrategiesService extends CrudBaseService<IStrategy> {
  constructor(http: HttpClient, auth: AuthService) {
    super(
      {
        endpoint: 'strategies',
      },
      http,
      auth
    );
  }
}
