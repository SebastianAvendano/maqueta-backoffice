// Libraries
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Query, AngularFirestoreCollection, DocumentReference, QuerySnapshot, DocumentSnapshot, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

// Services
import { AuthService } from '../../providers/auth/auth.service';
import { FirebaseService } from '../../providers/firebase/firebase.service';

// Models
import { Rol } from '../../models/rol/index';
import { User } from '../../models/user/index';

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
  getIdentificationType(): Observable<DocumentSnapshot<any>> {
    return this.firebase.getList<any>("metadata").doc("identificationType").get()
  }
  getDetailUser(id: string): AngularFirestoreDocument<User> {
    return this.firebase.getObject(this.collection, id)
  }
  createAuthUser(email: string, password: string): Promise<firebase.default.auth.UserCredential> {
    return this.auth.signUp(email, password)
  }
  createUser(data: Object, id: string): Promise<void> {
    return this.firebase.postListItemCustomId(this.collection, id, data)
  }
  updateUser(path: string, data: Object) {
    return this.firebase.putObject(this.collection, path, data)
  }
  deleteUser(path: string) {
    return this.firebase.deleteObject(path)
  }
  deleteUserAuth(user: firebase.default.User | null): void {
    user?.delete()
  }

}
