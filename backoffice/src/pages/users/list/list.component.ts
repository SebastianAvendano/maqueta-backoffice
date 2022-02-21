// Libraries
import { Component, OnInit } from '@angular/core';
import { QueryDocumentSnapshot, DocumentReference } from '@angular/fire/compat/firestore';
import { NzModalService } from 'ng-zorro-antd/modal';

// Services
import { UserService } from '../users.service';

// Models
import { Rol } from '../../../models/rol/index';
import { User } from '../../../models/user/index';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  users: User[] = []
  rol?: Rol
  isVisible = false;

  constructor(
    private userService: UserService,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    this.getRol()
  }

  getRol() {
    this.userService.getRolByKey("admin").then(snapshot => {
      this.rol = {
        ...snapshot.docs[0].data(),
        reference: snapshot.docs[0].ref
      }
      this.getUsers()
    })
  }

  getUsers() {
    this.userService
      .getUsersByRol(this.rol?.reference!)
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

  showModal(): void {
    this.modalService.create({
      nzTitle: 'Crear Usuario',
      nzWidth: '50%',
      nzContent: CreateComponent
    })
  }

}
