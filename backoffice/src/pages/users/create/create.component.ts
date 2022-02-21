import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { UserService } from '../users.service';
import { Rol } from '../../../models/rol/index';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  userForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };
  rol?: Rol

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private userService: UserService,
    ) {
      this.userForm = this.fb.group({
        email: [null, [Validators.email, Validators.required]],
        password: [null, [Validators.required]],
        firtsName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        identification: [null, [Validators.required]],
        phoneNumber: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        agree: [false]
      })
    }

  ngOnInit(): void {

  }

  getRol() {
    this.userService.getRolByKey("admin").then(snapshot => {
      this.rol = {
        ...snapshot.docs[0].data(),
        reference: snapshot.docs[0].ref,
      }
    })
  }

  createAuthUser(){
    const email= this.userForm.value.email
    const password= this.userForm.value.password
    this.userService.createAuthUser(email, password).then(
      (user) => {
        const id = user.user.uid
        if( id !== null){
          this.createUser(id)
        }
      }
      ).catch(
        error => console.log(error)
        )

  }

  createUser(id: string){

  }


  destroyModal(): void {
    this.modal.destroy();
  }

  submitForm(): void {
    if (this.userForm.valid) {
      console.log('submit', this.userForm.value);
    } else {
      Object.values(this.userForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
