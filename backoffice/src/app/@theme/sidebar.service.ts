import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  isCollapsed: boolean = false
  private isCollapsedOservable: Subject<boolean> = new Subject();

  collapsedObservable$ = this.isCollapsedOservable.asObservable();

  constructor() { }

  collapsed(collapsed: boolean) {
    this.isCollapsed = collapsed
    this.isCollapsedOservable.next(collapsed);
  }

}
