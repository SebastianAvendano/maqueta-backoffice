import { DocumentReference } from "@angular/fire/compat/firestore";
import { Rol } from '../rol/index';

export class User {
  constructor() {
    this.isActive = false
    this.reference= null;
    this.firtsName= ""
    this.lastName = ""
    this.identificationType = null
    this.identification = null
    this.email = ""
    this.rol = null
    this.id = null
    this.cellPhone = 0
    this.createdAt = new Date()
    this.updatedAt= new Date()
  }

  public isActive: boolean | null
  public reference: DocumentReference | null
  public lastName: string
  public firtsName: string
  public email: string
  public id: string | null
  public identificationType : DocumentReference | null
  public identification: number | null
  public rol: Rol | null
  public cellPhone: number
  public createdAt: Date
  public updatedAt : Date
}
