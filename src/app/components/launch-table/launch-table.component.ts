import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimeReleaseService } from 'src/app/services/time-release/time-release.service';
import { Observable } from 'rxjs';
import { TimeReleaseModel } from 'src/app/models/time-release.model';
import { map, find } from 'rxjs/operators';
import { CostCenterModel } from 'src/app/models/cost-center.model';
import { ToastHelperService } from 'src/app/services/toast-helper/toast-helper.service';
import { ToastType } from 'src/app/utils/helpers';
import { UserModel } from 'src/app/models/user.model';
import { NgForm, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import * as _ from 'lodash';

@Component({
  selector: 'tf-launch-table',
  templateUrl: './launch-table.component.html',
  styleUrls: ['./launch-table.component.scss']
})
export class LaunchTableComponent implements OnInit {
  @Input() costCenterList: CostCenterModel[] = [];
  @Input() loggedUser: UserModel;

  releases$: Observable<TimeReleaseModel[]>;
  releaseRegister: TimeReleaseModel;
  totalPages: number;
  isLoading = false;

  filterModel: any = {
    page: 0,
    size: 5
  };

  constructor(private timeReleaseService: TimeReleaseService, private toast: ToastHelperService) {}

  ngOnInit() {
    this.releaseRegister = {
      hour: 0,
      refDate: new Date()
    };

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

  public edit(id: string): void {
    const subscription = this.releases$.subscribe(res => {
      this.releaseRegister = _.cloneDeep(res.find(register => register._id === id));
      this.releaseRegister.costCenter = this.releaseRegister.costCenter._id;
      this.releaseRegister.refDate = formatDate(this.releaseRegister.refDate, 'yyyy-MM-dd', 'en','+0300');
      this.openEditModal();
    });

    subscription.unsubscribe();
  }

  public saveRelease(formData: NgForm): void {
    if (formData.invalid) {
      this.toast.show(ToastType.ERROR, 'Existem campos obrigatórios não preenchidos', 'Editar Lançamento');
      return;
    }
    this.isLoading = true;
    this.timeReleaseService.save(this.releaseRegister).subscribe(
      res => {
        this.isLoading = false;
        this.toast.show(ToastType.SUCCESS, res.message, 'Edição de lançamentos');
        this.search();
        this.closeEditModal();
      },
      err => {
        this.isLoading = false;
        this.toast.show(ToastType.ERROR, err.erro.message, 'Edição de lançamentos');
      }
    );
  }

  public remove(id: string): void {
    if (confirm('Deseja excluir este lançamento?')) {
      this.isLoading = true;
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

  private openEditModal(): void {
    const openModalBtn: HTMLElement = document.getElementById('openEditModal') as HTMLButtonElement;
    openModalBtn.click();
  }

  private closeEditModal(): void {
    const openModalBtn: HTMLElement = document.getElementById('closeEditModal') as HTMLButtonElement;
    openModalBtn.click();
  }
}
