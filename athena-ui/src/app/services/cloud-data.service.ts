import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class CloudDataService {

  private _cloudData: any;

  resetProvision: boolean = false;
  private subject = new BehaviorSubject<any>({ resetProvision: false });
  public setvalue = this.subject.asObservable();

  reset(val: boolean) {
    this.resetProvision = val;
    this.subject.next({ resetProvision: val });
  }

  constructor() { }


  setCloudData(val: any) {
    this._cloudData = val;
  }

  getCloudData() {
    return this._cloudData;
  }

}
