import { Component, OnInit } from '@angular/core';
import {Loginterface} from '../../models/Log';
import { LogService} from '../../services/log.service';
@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
logs: Loginterface[];
selectedLog: Loginterface;
loaded: Boolean = false;
  constructor(private logservice: LogService ) {

  }

  ngOnInit() {
//     this.logservice.stateClear.subscribe(clear => {
//       if (clear) {
// this.selectedLog = {id: '', text: '', date: ''};
//       }
//     });
    this.logservice.getLogs().subscribe(results => {
      this.logs = results;
      this.loaded = true ;
    });

  }
  onSelect(log: Loginterface) {
    console.log('sending the log from the logs component to service');
    this.logservice.setFormLog(log);

  }
  deleteLog(log: Loginterface) {

    console.log(log);
    if  (confirm('are you sure'))
    {
      this.logservice.deleteLog(log);
    }


  }
}
