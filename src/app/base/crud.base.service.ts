import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../services/auth.service';
import { BaseService, DEFAULT_CONFIG } from '@qbitartifacts/caste-client-ng';
import { environment } from 'src/environments/environment';

export interface CrudServiceOptions {
  endpoint: string;
}

export abstract class CrudBaseService<T = any> extends BaseService<
  CrudServiceOptions
> {
  constructor(config: any, http: HttpClient, private auth: AuthService) {
    super(http, {
      ...DEFAULT_CONFIG,
      ...config,
      url: environment.url,
    });
  }

  protected getToken() {
    return this.auth.session && this.auth.session.token;
  }

  public create(data: Partial<T>): Observable<T> {
    return this.post<T>(`/${this.opts.endpoint}`, data);
  }

  public listAll(): Observable<T[]> {
    return this.get<T[]>(`/${this.opts.endpoint}`);
  }

  public getOne(id: string): Observable<T> {
    return this.get<T>(`/${this.opts.endpoint}/${id}`);
  }

  public update(id: string, data: Partial<T>): Observable<T> {
    return this.put<T>(`/${this.opts.endpoint}/${id}`, data);
  }

  public remove(id: string): Observable<any> {
    return this.delete(`/${this.opts.endpoint}/${id}`);
  }
}
