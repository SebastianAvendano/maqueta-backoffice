import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()

export class BroadCastService {

  constructor() {
    }
    private _login: Subject<boolean> = new Subject();

    Login$ = this._login.asObservable();
    _showHideLayout: Subject<boolean> = new Subject();
    ShowHideLayout$ = this._showHideLayout.asObservable();

    Login(success:boolean){
       this._login.next(success);
    }

    ShowHideLayout(success:boolean){
        this._showHideLayout.next(success);
    }
}
