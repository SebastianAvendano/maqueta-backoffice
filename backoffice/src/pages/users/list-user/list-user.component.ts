// Libraries
import { Component, OnInit } from '@angular/core';
import { QueryDocumentSnapshot, DocumentReference } from '@angular/fire/compat/firestore';
import { NzModalService } from 'ng-zorro-antd/modal';

// Services
import { UserService } from '../users.service';

// Models
import { Rol } from '../../../models/rol/index';
import { User } from '../../../models/user/index';
import { CreateUserComponent } from '../create-user/create.component';

@Component({
  selector: 'app-list',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})

export class ListUserComponent implements OnInit {

  users: User[] = []
  rol?: Rol
  isVisible = false;
  selectedUser? : User
  collection: string = 'users'

  constructor(
    private userService: UserService,
    private modalService: NzModalService,

  ) { }

  ngOnInit() {
    this.getRol()
  }

  getRol() {
    this.userService.getRolByKey("user").then(snapshot => {
      this.rol = {
        ...snapshot.docs[0].data(),
        reference: snapshot.docs[0].ref
      }
      this.getUsers()
    })
  }

  getUsers() {
    this.userService
      .getUsersByRol(this.collection,this.rol?.reference!)
      .onSnapshot(async (snapshot) => {
        if (!snapshot.empty) {
          const usersParse = snapshot.docs.map((document) => {
           return this.parseData(document)
         })
         this.users = await Promise.all(usersParse)
        }
      })
  }

  async parseData(document: QueryDocumentSnapshot<any>): Promise<User> {
    const user = document.data() as any
    const rolData = await (user.rol as DocumentReference)?.get()
    const rol = (rolData.data() as Rol)

    return {
      ...user,
      createdAt: user.createdAt.toDate(),
      updatedAt: user.updatedAt.toDate(),
      rol: rol,
      reference: document.ref
    } as User
  }

  createUser(): void {

    this.showModal("Crear usuario")
  }

  showModal(title?: string, isEditing?: boolean, user?: User): void {
    this.modalService.create({
      nzTitle:  title,
      nzWidth: '50%',
      nzComponentParams: {
        isEditing: isEditing,
        rol: this.rol,
        user: user,
      },
      nzContent: CreateUserComponent
    })
  }

   editUser(user: User) {
    this.showModal("Actualizar usuario", true, user)
  }

  desactivateUser(user:User):void{
    const data: Object = {
      isActive: false,
    }
    this.userService.updateUser(this.collection, user?.reference?.id! ,  data)
  }

  deleteUser(user: User): void {
      this.userService.deleteUser(user?.reference?.path!).then(() => {
      }, error => {
        console.log(error)
      })
  }

}
