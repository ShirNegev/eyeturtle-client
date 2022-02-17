import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currId = '';

  constructor() { }

  setCurrId(id: string) {
    this.currId = id;
  }

  getCurrId() {
    return this.currId;
  }

  removeCurrId() {
    this.currId = '';
  }

  isCurrIdExist() {
    return this.currId.length != 0;
  }
}
