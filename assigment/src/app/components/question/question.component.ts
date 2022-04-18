import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() question: any;
  @Input() chatMessages: any;
  numOptions = 4;
  isAnswered = false;
  answerForm = new FormGroup({
    answer: new FormControl('', [Validators.required]),
  });
  @Output() answerEmitter = new EventEmitter<any>();
  constructor() {}
  OnInit() {
    this.isAnswered = false;
    this.answerForm.reset();
    if (this.question.question_type === 'button') {
      this.numOptions = Object.keys(this.question.question_options).length;
      console.log(this.numOptions, 'NUMOPTION');
    }
  }

  ngOnChanges(changes: any) {
    if (changes.question) {
      this.isAnswered = false;
      this.answerForm.reset();
    }
  }

  ngOnInit(): void {}

  sendButtonAnswer(selectedAnswer: number) {
    this.answerEmitter.emit(selectedAnswer);
    this.isAnswered = true;
  }
  sendTextAnswer() {
    this.answerEmitter.emit(this.answerForm.get('answer')?.value);
    this.isAnswered = true;
    this.answerForm.reset();
  }
}
