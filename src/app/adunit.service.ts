import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdUnit } from './components/index/adUnits';
@Injectable({
  providedIn: 'root'
})
export class AdunitService {
  // uri = 'http://localhost:5432/adunits';
  uria = 'postgres://qinlrafysrwafs:34e161122060fa8f10d932a22eab57768628b267473d75501349d0e34a1d1870';
  urib = '@ec2-174-129-192-200.compute-1.amazonaws.com:5432/';
  uric = 'd8pdtui7on0uec';
  uri = this.uria + this.urib + this.uric;

  constructor(private http: HttpClient) { }

  addAdUnit(unit_name, unit_price) {
    const obj = {
      unit_name: unit_name,
      unit_price: unit_price
    };
    this.http.post(`${this.uri}/add`, obj)
      .subscribe(res => console.log('Done'));
  }

  getAdUnits() {
    return this
      .http
      .get(`${this.uri}/adunits`);
  }
}
