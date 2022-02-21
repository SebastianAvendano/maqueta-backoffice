// Libraries
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Models
import { User } from '../../models/user/index';
import { NotificationService } from '../../providers/notifications/notification.service';
import { NavigatorService } from '../../providers/navigation/navigator/navigator.service';

// Services
import { UserService } from '../users/users.service';
import { AuthService } from '../../providers/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  message: string = ""
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private userService: UserService,
    private navCtrl: NavigatorService,
    private firestore: AngularFirestore,
    private notification : NotificationService
  ) {
    this.loginForm = this.fb.group({
      remember: [true],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const email = this.loginForm.value.email
      const password = this.loginForm.value.password

      await this.auth.login(email, password).then((user?) => {
        if (user?.user) {
          this.firestore.collection("users").doc(user.user!.uid).get().subscribe(async (documentSnapshot) => {

            const user = documentSnapshot.data() as User
            const rolUser = user.rol as any
            const rolId = rolUser.id
            const rolData = await this.userService.getRolByKey('admin')
            const rol = rolData.docs[0].ref.id

            if (rol === rolId) {
              this.auth.session(true)
              this.navCtrl.Push("dashboard");
            } else {
              this.auth.session(false)
              this.auth.logout()
              this.loginForm.reset()
              this.message = 'Usuario o contraseña incorrectos'
              this.notification.showMessage(this.message)
            }
          })
        }
      }
      ).catch(() => {
        this.isLoading = false
        this.message = 'Usuario o contraseña incorrectos'
        this.notification.showMessage(this.message)
      })
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty()
          control.updateValueAndValidity({ onlySelf: true })
          this.message = 'Los datos ingresados son invalidos'
          this.notification.showMessage(this.message)
        }
      })
    }
  }
}
