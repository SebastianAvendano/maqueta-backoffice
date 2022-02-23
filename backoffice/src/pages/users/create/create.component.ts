import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { UserService } from '../users.service';
import { Rol } from '../../../models/rol/index';
import { User } from '../../../models/user/index';

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
  user?: User
  isEditing: boolean = false
  documentType?: string[] = []

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private userService: UserService,
  ) {
    this.userForm = this.fb.group({
      isActive: [null ],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      firtsName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      identificationType: [null, [Validators.required]],
      identification: [null, [Validators.required]],
      cellPhone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    })
  }

  ngOnInit(): void {
    this.getIdentificationType()
    this.getDetailUser()
  }

  getIdentificationType(): void {
    const idType = this.userService.getIdentificationType().subscribe(snapshot => {
      this.documentType = Object.values(snapshot.data());
      idType.unsubscribe()
    })
  }

  getDetailUser(): void {
    if (this.user) {
      this.userForm.setValue({
        "isActive": this.user.isActive,
        "firtsName": this.user.firtsName,
        "lastName": this.user.lastName,
        "password": "",
        "identificationType": this.user.identificationType,
        "identification": this.user.identification,
        "cellPhone": this.user.cellPhone,
        "email": this.user.email,
      })
    }
  }

  createAuthUser(): void {
    if (this.userForm.valid) {
      const email = this.userForm.value.email
      const password = this.userForm.value.password
      this.userService.createAuthUser(email, password).then(
        async (credential) => {
          const id = credential.user?.uid
          if (id !== null) {
            const response = await this.createUser(id!)
            if (!response) {
              this.userService.deleteUserAuth(credential.user)
            }
          }
        }
      ).catch(
        error => console.log(error)
      )
    } else {
      Object.values(this.userForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsTouched()
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  async createUser(id: string): Promise<boolean> {

    const user: Object = {
      id: id,
      isActive: this.userForm.value.isActive? true: false,
      firtsName: this.userForm.value.firtsName,
      lastName: this.userForm.value.lastName,
      identificationType: this.userForm.value.identificationType,
      identification: this.userForm.value.identification,
      cellPhone: this.userForm.value.cellPhone,
      email: this.userForm.value.email,
      rol: this.rol?.reference,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return this.userService.createUser(user, id).then(() => {
      this.destroyModal()
      return true
    }, error => {
      return false
    })
  }

  validateAction() : void {
    if (this.isEditing) {
      this.updateUser()
    } else {
      this.createAuthUser()
    }
  }

  updateUser() {
    const user: Object = {
      isActive: this.userForm.value.isActive ? true : false,
      firtsName: this.userForm.value.firtsName,
      lastName: this.userForm.value.lastName,
      identificationType: this.userForm.value.identificationType,
      identification: this.userForm.value.identification,
      cellPhone: this.userForm.value.cellPhone,
      email: this.userForm.value.email,
      updatedAt: new Date()
    }
    this.userService.updateUser(this.user?.reference?.id!, user).then(() => {
      this.destroyModal()
    }, error => {
      console.log(error)
    })
  }

  destroyModal(): void {
    this.modal.destroy();
  }

}
