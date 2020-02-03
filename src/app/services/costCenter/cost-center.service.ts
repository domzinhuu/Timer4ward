import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CostCenterModel } from 'src/app/models/cost-center.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastHelperService } from '../toast-helper/toast-helper.service';
import { ToastType } from 'src/app/utils/helpers';
import { map, tap } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CostCenterService {
  private costCenterSubject = new BehaviorSubject([]);
  public costCenterList$: Observable<CostCenterModel[]> = this.costCenterSubject.asObservable();

  constructor(private httpClient: HttpClient, private toast: ToastHelperService) {}

  public updateCostCenterList(): void {
    this.httpClient
      .get(environment.api_url + '/costcenter')
      .pipe(map((res: any) => res.data))
      .subscribe(
        (res: any) => {
          this.costCenterSubject.next(_.orderBy(res, ['name'], ['asc']));
        },
        err => {
          this.toast.show(ToastType.ERROR, err.error.message, 'Centro de custo');
        }
      );
  }

  public create(costCenter: CostCenterModel): Observable<any> {
    return this.httpClient.post(environment.api_url + '/costcenter', costCenter).pipe(
      tap(res => {
        this.updateCostCenterList();
      })
    );
  }
}
