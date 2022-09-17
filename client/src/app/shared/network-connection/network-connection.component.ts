import { Component, OnInit } from '@angular/core';
import {networkConnection} from "../global/functions";

@Component({
  selector: 'network-connection',
  templateUrl: './network-connection.component.html',
  styleUrls: ['./network-connection.component.scss']
})
export class NetworkConnectionComponent implements OnInit {

  isOnline: boolean = true;

  constructor() { }

  ngOnInit(): void {
    networkConnection().subscribe((isOnline: boolean) => this.isOnline = isOnline);
  }

}
