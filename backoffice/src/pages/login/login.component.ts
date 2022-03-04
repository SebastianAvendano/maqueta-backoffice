// Libraries
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Auth, GoogleAuthProvider, signInWithPopup, signInAnonymously } from '@angular/fire/auth';
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
    // @Optional() private auth: Auth,
    private fb: FormBuilder,
    private afAuth: AuthService,
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

      await this.afAuth.login(email, password).then((user?) => {
        if (user?.user) {
          this.firestore.collection("admins").doc(user.user!.uid).get().subscribe(async (documentSnapshot) => {
            if (documentSnapshot.exists){

              const user = documentSnapshot.data() as User
              const rolUser = user.rol as any
              const rolId = rolUser.id
              const rolData = await this.userService.getRolByKey('admin')
              const rol = rolData.docs[0].ref.id
              const isActive = user.isActive

              if (rol === rolId) {
                if(isActive){
                  this.afAuth.session(true)
                  this.navCtrl.Push("dashboard");
                }else {
                  this.message = "usuario inactivo"
                  this.logout(this.message)

                }
              } else {
                this.message = 'Usuario o contraseña incorrectos'
                this.logout(this.message)
              }
            } else {
              this.message = 'Usuario o contraseña incorrectos'
              this.logout(this.message)
            }
          })
        }
      }
      ).catch(() => {
        this.message = 'Usuario o contraseña incorrectos'
        this.logout(this.message)
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

  logout(message:string){
    this.afAuth.session(false)
    this.loginForm.reset()
    this.afAuth.logout()
    this.isLoading = false
    this.notification.showMessage(message)
  }
}
