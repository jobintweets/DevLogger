import { Injectable } from '@angular/core';
import {Loginterface} from '../models/Log';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import { currentId } from 'async_hooks';

@Injectable({
  providedIn: 'root'
})
export class LogService {
logs: Loginterface[];
private logSource = new BehaviorSubject <Loginterface>({id: null, text: null , date: null});
// for a BehavioralSubject initially there should be a value
selectedLog = this.logSource.asObservable();

  constructor() {
    // this.logs = [
    //   {id: '1', text: 'new log', date: new Date('12/3/2018 12:30:34') },
    //   {id: '2', text: 'new log2', date: new Date('4/7/2019 4:30:45') },
    //   {id: '3', text: 'new log3', date: new Date('5/8/2019 9:56:25') },
    //   {id: '4', text: 'new log4', date: new Date('06/03/2019 4:03:05') },

    // ];
    this.logs = [];
   }
   getLogs(): Observable<Loginterface[]> {
     if (localStorage.getItem('logs') === null) {
this.logs = [] ;
} else {
this.logs   = JSON.parse( localStorage.getItem('logs'));
}
     return of(this.logs );
   }
   setFormLog(log: Loginterface) {
     this.logSource.next(log);
    //  assigning a new value eaach time

   }
   addLog(log: Loginterface) {
     console.log(log);
     this.logs.unshift(log);
     localStorage.setItem('logs', JSON.stringify(this.logs));
   }
   update(log: Loginterface) {
     this.logs.forEach((cur, index) => {
       if (log.id === cur.id) {
          this.logs.splice(index, 1);
       }
     });
this.logs.unshift(log);
localStorage.setItem('logs', JSON.stringify(this.logs));
   }
   deleteLog (log: Loginterface) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
         this.logs.splice(index, 1);
      }

    });
    localStorage.setItem('logs', JSON.stringify(this.logs));
 
  }


}
