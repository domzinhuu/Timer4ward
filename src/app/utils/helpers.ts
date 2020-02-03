import { HttpParams } from '@angular/common/http';

export enum ToastType {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info'
}

export const mountHttpParams = (filter: any = {}): HttpParams => {
  let params = new HttpParams();

  Object.keys(filter).forEach(key => {
    if (filter[key] || filter[key] === 0 || typeof filter[key] === 'boolean') {
      params = params.append(key, filter[key]);
    }
  });

  return params;
};
