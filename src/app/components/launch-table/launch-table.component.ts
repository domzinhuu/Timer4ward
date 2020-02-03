import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimeReleaseService } from 'src/app/services/time-release/time-release.service';
import { Observable } from 'rxjs';
import { TimeReleaseModel } from 'src/app/models/time-release.model';
import { map } from 'rxjs/operators';
import { CostCenterModel } from 'src/app/models/cost-center.model';
import { ToastHelperService } from 'src/app/services/toast-helper/toast-helper.service';
import { ToastType } from 'src/app/utils/helpers';

@Component({
  selector: 'tf-launch-table',
  templateUrl: './launch-table.component.html',
  styleUrls: ['./launch-table.component.scss']
})
export class LaunchTableComponent implements OnInit {
  @Input() costCenterList: CostCenterModel[] = [];

  releases$: Observable<TimeReleaseModel[]>;
  totalPages: number;
  isLoading = false;

  filterModel: any = {
    page: 0,
    size: 5
  };

  constructor(private timeReleaseService: TimeReleaseService, private toast: ToastHelperService) {}

  ngOnInit() {
    this.releases$ = this.timeReleaseService.releases$.pipe(map((res: any) => res.data));
    this.search();
  }

  public nextPage(): void {
    if (this.filterModel.page >= this.totalPages) {
      return;
    }
    this.filterModel.page++;
    this.search();
  }

  public previousPage(): void {
    if (this.filterModel.page === 0) {
      return;
    }
    this.filterModel.page--;
    this.search();
  }

  public search(resetPagination = false): void {
    if (resetPagination) {
      this.filterModel.page = 0;
      this.totalPages = 1;
    }

    this.isLoading = true;
    this.timeReleaseService.getReleases(this.filterModel).subscribe(res => {
      this.totalPages = res.totalPages;
      this.isLoading = false;
    });
  }

  public edit(id: string): void {}

  public remove(id: string): void {
    this.isLoading = true;

    if (confirm('Deseja excluir este lançamento?')) {
      this.timeReleaseService.remove(id).subscribe(
        res => {
          this.isLoading = false;
          this.toast.show(ToastType.SUCCESS, res.message, 'Lançamentos');
          this.search();
        },
        err => {
          this.isLoading = false;
          this.toast.show(ToastType.ERROR, err.error.message, 'Lançamentos');
        }
      );
    }
  }

  public formatTime(hour: number, minute: number): string {
    const hr = '00' + hour;
    const min = '00' + minute;

    const formated = hr.substring(hr.length - 2) + ':' + min.substring(min.length - 2);
    return formated;
  }
}
