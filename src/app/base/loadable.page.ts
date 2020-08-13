import { PageBaseComponent } from 'src/app/base/page.base';

export interface LoadableComponent {
  isLoading: boolean;
  setIsLoading(loading: boolean): void;
}

export interface LoadablePageComponent extends PageBaseComponent {
  isLoading: boolean;
  setIsLoading(loading: boolean): void;
}
