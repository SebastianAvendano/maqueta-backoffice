/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListAdminsComponent } from './list-admins.component';
import { FirebaseService } from '../../../providers/firebase/firebase.service';

describe('ListAdminsComponent', () => {
  let component: ListAdminsComponent;
  let fixture: ComponentFixture<ListAdminsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseService],
      declarations: [ ListAdminsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
