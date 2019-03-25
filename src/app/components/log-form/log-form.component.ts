import { Component, OnInit } from '@angular/core';
import { LogService} from '../../services/log.service';
import {Loginterface} from '../../models/Log';
@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  id: string;
  text: string;
  date: any;
 isNew: Boolean = true;
  constructor(private logservice: LogService ) { }

  ngOnInit() {
// subscribe to the selectedLog observable
this.logservice.selectedLog.subscribe(result => {
  // received to the log-from component from the log component through the service which used the Behavioursubject
  console.log('received to the log-from component from the log component through the service which used the Behavioursubject');
console.log(result);
if (result.id !== null) {
  this.isNew = false;
  this.id = result.id ;
  this.text = result.text ;
  this.date = result.date;

}
});
  }
  onSubmit() {
    console.log('submit');
    // check if it is a new log
    if (this.isNew) {
const newLog = {
  id : this.generateId(),
  text : this.text ,
  // whatever text that is typed in the form
  date : new Date()
 };
    // adding a service method to add a new log;
    this.logservice.addLog(newLog);
} else {
// create log to be updated
console.log('updated');
// create log to be updated
const updatedLog = {
  id: this.id,
  text : this.text,
  date : new Date()
};
this.logservice.update(updatedLog);

    }
    // clearing the state
    this.clearState();

  }
  clearState() {
    this.isNew = true;
this.id = '';
this.text = '';
this.date = '';



  }

  generateId() {
    let r ;
    let v;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       r = Math.random()*16|0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
