import { Component, OnInit } from '@angular/core';
import { AdUnit } from './adUnits';
import { AdunitService } from './../../adunit.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  adunits: AdUnit[];

  constructor(private adunitService: AdunitService) { }

  ngOnInit() {
    this.adunitService
      .getAdUnits()
      .subscribe((data: AdUnit[]) => {
        this.adunits = data;
      });
  }

}
