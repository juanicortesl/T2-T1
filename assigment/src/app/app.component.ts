import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'assigment';
  webSocket: WebSocket;
  lobby: any;
  isConnected = false;
  currentQuestion: any;
  currentTimer = 10;
  constructor() {
    this.webSocket = new WebSocket(
      'wss://trivia.tallerdeintegracion.cl/connect'
    );
    this.webSocket.onopen = (e) => {
      console.log(e);
    };
    this.webSocket.onmessage = (e: any) => {
      const data = JSON.parse(e.data);
      if (data.type == 'accepted') this.isConnected = true;
      if (data.type == 'lobby') {
        if (data.seconds_remaining > 0) {
          this.lobby = data;
        } else {
          this.lobby = undefined;
        }
      }
      if (data.type == 'question') {
        this.lobby = undefined;
        this.currentQuestion = data;
      }
      if (data.type == 'timer') {
        this.currentTimer = data.seconds_remaining;
      }
      console.log(data);
    };
  }

  joinSocket() {
    this.webSocket.send(
      JSON.stringify({
        type: 'join',
        id: '8eef956d-1a3b-47a8-bf8a-46a0dbbe2277',
        username: 'Juan Cortes',
      })
    );
  }
}
