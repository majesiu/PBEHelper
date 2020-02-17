import { Component, OnInit } from '@angular/core';

export interface UpdateTask {
  name: string;
  position: number;
  tpe: number;
  link: string;
}

const ELEMENT_DATA: UpdateTask[] = [
  {position: 1, name: '', tpe: 3, link: ''},
];

@Component({
  selector: 'app-update-player',
  templateUrl: './update-player.component.html',
  styleUrls: ['./update-player.component.scss']
})
export class UpdatePlayerComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'link', 'tpe'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
