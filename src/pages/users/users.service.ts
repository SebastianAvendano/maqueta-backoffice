import { Injectable } from '@angular/core';
import { FirebaseService } from '../../providers/firebase/firebase.service';
import { Query, AngularFirestoreCollection, DocumentReference, DocumentSnapshot, AngularFirestoreDocument, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../providers/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private collection: string = "users"

  constructor(
    private firebase: FirebaseService,
    private autentication: AuthService
  ) { }

  getUsersByRol(rol: DocumentReference): Query<any> {
    return this.firebase.getList<any>(this.collection).ref.where('rol', '==', rol).orderBy('createdAt', "desc")
  }

  // getRol(): AngularFirestoreCollection<Rols> {
  //   return this.firebase.getList<Rols>("rols")
  // }

  getRolByKey(key: string): Promise<QuerySnapshot<any>> {
    return this.firebase.getList<any>("rols").ref.where('name', '==', key).get()
  }

  // getIdentificationType(): Observable<DocumentSnapshot<any>> {
  //   return this.firebase.getList<any>("metadata").doc("identificationType").get()
  // }

  // createAuthUser(email, password) : Promise<any>{
  //   return this.autentication.signUp(email, password)
  // }

  // createUser(data: Object, id: string): Promise<void> {
  //   return this.firebase.postListItemCustomId(this.collection, id, data)
  // }

  // getDetailUser(id: string): AngularFirestoreDocument<Users> {
  //   return this.firebase.getObject(this.collection, id)
  // }

  // deleteUser(path: string) {
  //   return this.firebase.deleteObject(path)
  // }

  // updateUser(path: string, data: Object) {
  //   return this.firebase.putObject(this.collection, path, data)
  // }

}
