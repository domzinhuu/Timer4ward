import { Component, OnInit, ViewChild } from '@angular/core';
import { CostCenterService } from 'src/app/services/costCenter/cost-center.service';
import { NgForm } from '@angular/forms';
import { ToastHelperService } from 'src/app/services/toast-helper/toast-helper.service';
import { ToastType } from 'src/app/utils/helpers';
import { CostCenterModel } from 'src/app/models/cost-center.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'tf-cost-center',
  templateUrl: './cost-center.component.html',
  styleUrls: ['./cost-center.component.scss']
})
export class CostCenterComponent implements OnInit {
  isLoading = false;
  @ViewChild('costForm', { static: false }) costForm: NgForm;

  constructor(private ccService: CostCenterService, private toast: ToastHelperService) {}

  ngOnInit() {}

  public save(): void {
    if (this.costForm.invalid) {
      this.toast.show(ToastType.ERROR, 'Preencha os campos obrigatórios', 'Centro de Custo');
      return;
    }

    this.isLoading = true;
    const costCenter: CostCenterModel = this.costForm.value as CostCenterModel;

    this.ccService.create(costCenter).subscribe(
      res => {
        this.toast.show(ToastType.SUCCESS, 'Novo centro de custo adicionado!', 'Centro de Custo');
        this.isLoading = false;
        this.costForm.resetForm();
      },
      (err: HttpErrorResponse) => {
        this.toast.show(ToastType.ERROR, err.error.message, 'Centro de Custo');
        this.isLoading = false;
      }
    );
  }
}
