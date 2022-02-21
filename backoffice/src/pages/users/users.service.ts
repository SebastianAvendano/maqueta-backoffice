import { Injectable } from '@angular/core';
import { FirebaseService } from '../../providers/firebase/firebase.service';
import { Query, AngularFirestoreCollection, DocumentReference, QuerySnapshot } from '@angular/fire/compat/firestore';

// Models
import { Rol } from '../../models/rol/index';
import { AuthService } from '../../providers/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private collection: string = "users"

  constructor(
    private firebase: FirebaseService,
    private auth: AuthService
  ) { }

  getUsersByRol(rol: DocumentReference): Query<any> {
    return this.firebase.getList<any>(this.collection).ref.where('rol', '==', rol).orderBy('createdAt', "desc")
  }

  getRol(): AngularFirestoreCollection<Rol> {
    return this.firebase.getList<Rol>("rols")
  }

  getRolByKey(key: string): Promise<QuerySnapshot<any>> {
    return this.firebase.getList<any>("rols").ref.where('name', '==', key).get()
  }

  createAuthUser(email: string, password: string) : Promise<any>{
    return this.auth.signUp(email, password)
  }
  createUser(){

  }
}
