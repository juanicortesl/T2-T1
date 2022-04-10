import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() question: any;
  numOptions = 4;
  constructor() {}
  OnInit() {
    if (this.question.question_type === 'button') {
      this.numOptions = Object.keys(this.question.question_options).length;
      console.log(this.numOptions, 'NUMOPTION');
    }
  }

  ngOnInit(): void {}
}
