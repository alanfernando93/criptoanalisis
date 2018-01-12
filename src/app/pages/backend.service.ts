import { Injectable } from '@angular/core';

@Injectable()
export class BackendService {

  protected host:String = "http://localhost:3000";

  constructor() { }

  getHost(){
    return this.host;
  }

}
