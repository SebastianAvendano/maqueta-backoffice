import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFirestore) {
  }

  getList<T>(url: string, query?: (ref: firebase.firestore.CollectionReference) => firebase.firestore.Query): AngularFirestoreCollection<T> {
    var result;
    if (query == null || query == undefined) {
      result = this.db.collection<T>(url);
    }
    else {
      result = this.db.collection<T>(url, query);
    }

    return result;
  }

  getObject(url: string, id: string): AngularFirestoreDocument<any> {
    return this.db.collection(url).doc(id);
  }

  getTypedObject<T>(url: string): AngularFirestoreDocument<any> {
    return this.db.doc<T>(url);
  }

  postObject(url: string, data: any) {
    var collection = this.db.doc(url);
    return collection.set(data);
  }

  putObject(url: string, id: string, data: any) {
    const itemObservable = this.db.collection(url).doc(id);
    return itemObservable.update(data);
  }

  deleteObject(url: string) {
    const itemObservable = this.db.doc(url);
    return itemObservable.delete();
  }

  postListItem(url: string, data: any) {
    const items = this.db.collection(url);
    return items.add(data);
  }

  postListItemCustomId(url: string, id: string, data: any) {
    const items = this.db.collection(url).doc(id);
    return items.set(data);
  }

}
