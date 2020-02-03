import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastHelperService {
  constructor(private toast: ToastrService) {}

  public show(type: string, message: string, title?: string): void {
    this.toast[type](message, title);
  }
}
