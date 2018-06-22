import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {

  // header for json/content-type
  public headers = new HttpHeaders().set('Accept', 'application/json').set('Content-Type', 'application/json');
  // header for form data
  public headers_1 = new HttpHeaders().set('Content-Type', 'multipart/form-data');
  // header for url-encoded data
  public headers_2 = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  constructor(public http: HttpClient) {
    console.log('Hello ServiceProvider Provider');
  }

  postService(param: any, data: any): Observable<any> {
    //  Uncomment to use
      return this.http.post('http://127.0.0.1:3000' + param, data, {headers: this.headers});
  }

  getService(param: any): Observable<any> {
    console.log('param ',param);
     //  Uncomment to use
      return this.http.get('http://127.0.0.1:3000' + param,  {headers: this.headers});
  }

}
