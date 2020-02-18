import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';  
import {MatTable} from '@angular/material';
export interface UpdateTask {
  name: string;
  tpe: number;
  link: string;
}


const ELEMENT_DATA: UpdateTask[] = [
  {name: '', tpe: 3, link: ''},
];

@Component({
  selector: 'app-update-player',
  templateUrl: './update-player.component.html',
  styleUrls: ['./update-player.component.scss']
})
export class UpdatePlayerComponent implements OnInit {


  displayedColumns: string[] = ['name', 'link', 'tpe'];
  dataSource = ELEMENT_DATA;
  firstFormGroup: FormGroup;

  
  @ViewChild(MatTable, {static: false}) table: MatTable<any>;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

  newTask(type: String) {
    switch (type) {
      case 'empty':
          this.dataSource.push({name: '', tpe: 0, link: ''});
        break;
      case 'ac':
          this.dataSource.push({name: 'Activity Check', tpe: 3, link: ''});
          window.open('http://probaseballexperience.jcink.net/index.php?showforum=77');
        break;
      case 'pt':
        this.dataSource.push({name: 'PT', tpe: 3, link: ''});
        window.open('http://probaseballexperience.jcink.net/index.php?showforum=56');
      break;
      case 'wt':
          this.dataSource.push({name: 'Weekly Training', tpe: 5, link: ''});
          window.open('http://probaseballexperience.jcink.net/index.php?showforum=79');
        break;
      case 'tc':
          this.dataSource.push({name: 'Weekly Training', tpe: 10, link: ''});
          window.open('http://probaseballexperience.jcink.net/index.php?showforum=57');
        break;
      default:
        break;
    }
    this.table.renderRows();
  }
}
