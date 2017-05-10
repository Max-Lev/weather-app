import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
@Injectable()
export class DeleteService {

  constructor() { }

  deleteList: any = new Subject();
  deleteList$ = this.deleteList.asObservable();
  indx: Array<any> = [];
  indx$: any;

  getItem(): Observable<any> {
    this.indx$ = Rx.Observable.of(this.indx);
    this.indx$.subscribe((indx) => { return indx; });
    return this.indx$;
  };

  setItem(indx: number, state: boolean) {

    if (state) {
      this.indx.push(indx);
    }
    if (!state) {
      //check if index already exists in an array
      // if true: remove duplicated key
      this.indx.find((itm, key) => {
        if (itm == indx) {
          this.indx.splice(key, 1);
          return true;
        }
      });
    }
    this.indx$ = Rx.Observable.of(this.indx);
    this.deleteList.next(this.indx);

  };

  reset() {
    this.indx = [];
    this.indx$ = Rx.Observable.of(this.indx);
    this.deleteList.next(this.indx);
  };


}
