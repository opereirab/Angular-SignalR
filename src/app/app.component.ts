import { Component, OnInit } from '@angular/core';
import { MessageServiceService } from './message-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public messageService: MessageServiceService, private http: HttpClient) { }

  ngOnInit() {
    this.messageService.startConnection();
  }
}
