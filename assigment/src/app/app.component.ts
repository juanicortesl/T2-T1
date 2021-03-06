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
  scores: any[] = [];
  scoresDict: any = {};
  streak: any = {};
  result: any = {};
  highScores: any[] = [];
  chatMessages: any[] = [];
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
        this.streak = {};
        this.result = {};
        this.currentQuestion = undefined;
        this.highScores = [];
        if (data.seconds_remaining > 0) {
          this.lobby = data;
        } else {
          this.lobby = undefined;
        }
      }
      if (data.type == 'question') {
        console.log(data);
        this.lobby = undefined;
        this.currentQuestion = data;
        this.chatMessages = [];
      }
      if (data.type == 'score') {
        this.scoresDict = data.scores;
        this.scores = Object.keys(data.scores);
      }
      if (data.type == 'result') {
        this.result = data;
      }
      if (data.type == 'timer') {
        this.currentTimer = data.seconds_remaining;
      }
      if (data.type == 'streak') {
        this.streak = { username: data.username, streak: data.streak };
      }
      if (data.type == 'highscore') {
        this.currentQuestion = undefined;
        this.highScores = data.winners;
      }
      if (data.type == 'disconnected') {
        this.isConnected = false;
      }
      if (data.type == 'chat') {
        this.chatMessages.push({
          username: data.username,
          message: data.message,
          time: new Date(),
        });
      }
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

  sendAnswer(answer: any) {
    this.webSocket.send(
      JSON.stringify({
        type: 'answer',
        question_id: this.currentQuestion.question_id,
        value: answer,
      })
    );
  }
}
