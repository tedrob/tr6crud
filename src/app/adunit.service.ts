import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AdUnit } from './components/index/adUnits';
@Injectable({
  providedIn: 'root'
})
export class AdunitService {
  // uri = 'http://localhost:5432/'; // 8080/';
  uri = 'http://localhost:8080/adunits';

  constructor(private http: HttpClient) { }

  addAdUnit(unit_name: any, unit_price: any) {
    console.log('inService Add uri', `${this.uri}/add`, unit_name);
    const uri = 'http://localhost:8080/adunits/add';
    const obj = {
      unit_name: unit_name,
      unit_price: unit_price
    };
    this.http
      // .post(uri, obj) // .post(`${this.uri}/add`, obj)
      .post(`${this.uri}/add`, {responseType: 'blob'})
      .pipe(
        catchError(error => {
          return throwError(`Something went wrong adding! ${error.message}`);
        })
      )
      .subscribe(res => console.log('Done'));
  }

  getAdUnits() {
    return this
      .http
      .get(`${this.uri}/`, {responseType: 'blob'})
      .pipe(map(res => {
        return res;
      }), catchError(error => {
        return throwError(`Something went wrong! ${error.message}`);
      }));
  }

  editAdUnit(id: any) {
    return this
      .http
      .get(`${this.uri}/edit/${id}`)
      .pipe(map(res => {
        return res;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }

  updateAdUnit(unit_name: any, unit_price: any, id: any) {
    const obj = {
      unit_name: unit_name,
      unit_price: unit_price
    };
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }

  deleteAdUnit(id: any) {
    return this
      .http
      .get(`${this.uri}/delete/${id}`)
      .pipe(map(res => {
        return res;
      }));
  }
}
