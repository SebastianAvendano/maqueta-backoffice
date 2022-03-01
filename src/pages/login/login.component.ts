import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../models/login/index';
import { NavigatorService } from '../../providers/navigation/navigator/navigator.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UsersService } from '../users/users.service';
import { User } from '../../models/user/index';
import { AuthService } from '../../providers/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private firestore: AngularFirestore,
    private userService: UsersService,
    private fb: FormBuilder,
    private navCtrl: NavigatorService,
    private auth: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      remember: [true]
    });
  }

  ngOnInit() {
  }

  async login() {

    if (this.loginForm.valid) {
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
              console.log('problemas en el login')
            }
          })
        }
      }
      ).catch(error =>
        console.log(error)
      )
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty()
          control.updateValueAndValidity({ onlySelf: true })
        }
      })
    }
  }

}
