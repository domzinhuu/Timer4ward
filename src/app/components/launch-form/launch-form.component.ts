import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { CostCenterModel } from 'src/app/models/cost-center.model';
import { ToastHelperService } from 'src/app/services/toast-helper/toast-helper.service';
import { TimeReleaseService } from 'src/app/services/time-release/time-release.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastType } from 'src/app/utils/helpers';
import { TimeReleaseModel } from 'src/app/models/time-release.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'tf-launch-form',
  templateUrl: './launch-form.component.html',
  styleUrls: ['./launch-form.component.scss']
})
export class LaunchFormComponent implements OnInit {
  @Input() costCenterList: CostCenterModel[] = [];
  @Input() loggedUserId: string;

  isLoading = false;
  releaseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toast: ToastHelperService,
    private timeReleaseService: TimeReleaseService
  ) {}

  ngOnInit() {
    this.releaseForm = this.fb.group({
      hour: ['', Validators.required],
      minute: ['', Validators.required],
      refDate: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), Validators.required],
      description: [''],
      costCenter: [null, Validators.required]
    });
  }

  public saveRelease(): void {
    if (this.releaseForm.invalid) {
      this.toast.show(ToastType.ERROR, 'Preencha os campos obrigatórios', 'Registro de tempo');
      return;
    }

    const { hour, minute } = this.releaseForm.value;

    if (!hour && !minute) {
      this.toast.show(ToastType.ERROR, 'Lançamento zerado não é permitido.', 'Registro de tempo');
      return;
    }

    this.isLoading = true;
    const release: TimeReleaseModel = this.releaseForm.value as TimeReleaseModel;

    this.timeReleaseService.save(release).subscribe(
      res => {
        this.isLoading = false;
        this.toast.show(ToastType.SUCCESS, res.message, 'Registro de tempo');
        this.releaseForm.reset();
      },
      err => {
        this.isLoading = false;
        this.toast.show(ToastType.ERROR, err.error.message, 'Registro de tempo');
      }
    );
  }
}
