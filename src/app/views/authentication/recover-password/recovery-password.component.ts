import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastHelperService } from 'src/app/services/toast-helper/toast-helper.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ToastType } from 'src/app/utils/helpers';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent implements OnInit {
  isLoading = false;
  token: string;

  constructor(
    private toast: ToastHelperService,
    private router: Router,
    private loginService: AuthenticationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.token = params.token;
    });
  }

  public sendNewPassword(formData: NgForm): void {
    if (this.validateForm(formData)) {
      const { password } = formData.value;
      this.sendToRecovery(password);
    }
  }

  private validateForm(formData: NgForm): boolean {
    if (formData.invalid) {
      this.toast.show(ToastType.ERROR, 'Preencha os campos corretamente.', 'Recuperar Senha');
      return false;
    }

    const { password, passwordConfirm } = formData.value;

    if (password !== passwordConfirm) {
      this.toast.show(ToastType.ERROR, 'As senhas informadas não são iguais', 'Recuperar Senha');
      return false;
    }

    return true;
  }
  private sendToRecovery(password: string): void {
    this.isLoading = true;

    this.loginService.recoveryPassword(this.token, password).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.toast.show(ToastType.SUCCESS, res.message, 'Recuperar Senha');
        this.router.navigateByUrl('/login');
      },
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.toast.show(ToastType.ERROR, err.error.message, 'Recuperar Senha');
      }
    );
  }
}
