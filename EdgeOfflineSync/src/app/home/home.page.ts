import { Component } from '@angular/core';
import { PouchDBService } from '../services/pouchdb.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private pouchDB: PouchDBService) {
    this.pouchDB.init();
  }

  startSync() {
    this.pouchDB.startSync();
  }

}
