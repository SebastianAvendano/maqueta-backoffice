import { DocumentReference } from "@angular/fire/compat/firestore";
import { Rol } from '../rol/index';

export class User {
  constructor() {
    this.reference= null;
    this.identification = null
    this.createdAt = new Date()
    this.email = ""
    this.password = null
    this.isActive = false
    this.rol = null
    this.id = null
  }

  public reference: DocumentReference | null
  public createdAt: Date
  public email: string
  public id: string | null
  public password: string | null
  public identification: number | null
  public isActive: boolean
  public rol: Rol | null
}
