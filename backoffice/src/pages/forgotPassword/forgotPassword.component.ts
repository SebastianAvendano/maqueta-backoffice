import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth/auth.service';
import { NotificationService } from '../../providers/notifications/notification.service';
import { NavigatorService } from '../../providers/navigation/navigator/navigator.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forgotPassword',
  templateUrl: './forgotPassword.component.html',
  styleUrls: ['./forgotPassword.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm!: FormGroup;
  isLoading = false

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private navCtrl: NavigatorService,
    private notification: NotificationService,
    private location:Location

  ) {
    this.forgotForm = this.fb.group({
      remember: [true],
      email: [null, [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
  }

  async resetPassword() {
    if (this.forgotForm.valid) {
      const email = this.forgotForm.value.email
      this.isLoading = true
      await this.auth.resetPassword(email).then(() => {
        this.notification.showMessage('Mensaje enviado con exito')
        this.navCtrl.Push('/login')
        this.isLoading = false
      }).catch(() => {
        this.isLoading = false
        this.notification.showMessage('Este correo no esta registrado en la base de datos')
      }
      )
    } else {
      Object.values(this.forgotForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty()
          control.updateValueAndValidity({ onlySelf: true })
        }
      })
    }
  }

  goBack():void{
    this.location.back();
  }

}
