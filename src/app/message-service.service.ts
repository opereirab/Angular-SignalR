import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {
  private hubConnection: signalR.HubConnection

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/chathub')
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection.on("NewNotify", (message: Message) => {
      let messages = document.createElement("div");
      messages.innerHTML = `<div>id: ${message.id}<br/>date: ${message.dateTime}<br/>text: ${message.text}<hr/></div>`;
      const divMessages: HTMLDivElement = document.querySelector("#divMessages");
      divMessages.appendChild(messages);
      divMessages.scrollTop = divMessages.scrollHeight;
    });

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        let messages = document.createElement("div");
        messages.innerHTML = `<div>Connection started<hr/></div>`;
        document.querySelector("#divMessages").appendChild(messages);
      })
      .catch(err => {
        console.log('Error while starting connection: ' + err);
        let messages = document.createElement("div");
        messages.innerHTML = `<div>Error while starting connection: ${err}<hr/></div>`;
        document.querySelector("#divMessages").appendChild(messages);
      })
  }
}