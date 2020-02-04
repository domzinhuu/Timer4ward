import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ToastHelperService } from 'src/app/services/toast-helper/toast-helper.service';
import { ToastType } from 'src/app/utils/helpers';
import { NgForm } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  isLoading = false;
  isForgetPassword = false;
  constructor(private loginService: AuthenticationService, private toast: ToastHelperService, private router: Router) {}

  ngOnInit() {}

  public login(formData: NgForm): void {
    if (formData.invalid) {
      this.toast.show(ToastType.ERROR, 'Preencha o email e o password', 'Login');
      return;
    }

    this.isLoading = true;

    const { email, password } = formData.value;

    this.loginService.login(email, password).subscribe(
      (res: UserModel) => {
        this.isLoading = false;
        this.toast.show(ToastType.SUCCESS, 'Bem vindo ' + res.name, 'Usuário logado');
        this.router.navigateByUrl('/dashboard');
      },
      err => {
        this.isLoading = false;
        this.toast.show(ToastType.ERROR, err.error.message, 'Login');
      }
    );
  }

  public recoveryPassword(formData: NgForm): void {
    if (formData.invalid) {
      this.toast.show(ToastType.ERROR, 'Informe o email', 'Recuperação de senha');
      return;
    }

    const { email } = formData.value;

    this.isLoading = true;
    this.loginService.forgotPassword(email).subscribe(
      (res: any) => {
        this.isForgetPassword = false;
        this.isLoading = false;
        this.toast.show(ToastType.SUCCESS, res.message, 'Email enviado');
      },
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.toast.show(ToastType.ERROR, err.error.message, 'Recuperação de senha');
      }
    );
  }
}
