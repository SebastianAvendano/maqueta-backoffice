import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { UserService } from '../users.service';
import { Rol } from '../../../models/rol/index';
import { User } from '../../../models/user/index';
import { NotificationService } from '../../../providers/notifications/notification.service';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {
  userForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };
  rol?: Rol
  user?: User
  isEditing: boolean = false
  documentType?: string[] = []
  collection!: string

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private userService: UserService,
    private notification: NotificationService
  ) {
    this.userForm = this.fb.group({
      isActive: [null ],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      firtsName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      identificationType: [null, [Validators.required]],
      identification: [null, [Validators.required, Validators.pattern('[0-9]*$')]],
      cellPhone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*$')]],
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
            const response = await this.createAdmin(id!)
            if (!response) {
              this.userService.deleteUserAuth(credential.user)
            }
          }
        }
      ).catch(error => {
        if (error.code == 'auth/email-already-in-use'){
          this.notification.showMessage('el correo electronico ya es usado por otro usuario')
        }
      }
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

  async createAdmin(id: string): Promise<boolean> {

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
    return this.userService.createUser(this.collection ,user, id).then(() => {
      this.destroyModal()
      return true
    }, error => {
      return false
    })
  }

  validateAction() : void {
    if (this.isEditing) {
      this.updateAdmin()
    } else {
      this.createAuthUser()
    }
  }

  updateAdmin() {
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
    this.userService.updateUser(this.collection , this.user?.reference?.id!, user).then(() => {
      this.destroyModal()
    }, error => {
      console.log(error)
    })
  }

  destroyModal(): void {
    this.modal.destroy();
  }

}
