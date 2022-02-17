import {Component, HostListener, OnInit} from '@angular/core';
import {QuestionService} from "../../services/question.service";
import {Question} from "../../models/question";
import {Test} from "../../models/test";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  isLoading = true;
  questions: Array<Question> = [];
  currentQuestion: Question = {
    'id': 0,
    'content': '',
    'possible_answers': []
  };
  chosenId: any;
  currentQuestionNumber = 0;
  testArray: Array<Test> = [];

  constructor(private questionService: QuestionService, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.questionService.getQuestion().subscribe(value => {
      this.questions = value;
      this.createTestArray();
      if (this.questions.length > 0) {
        this.currentQuestion = this.questions[this.currentQuestionNumber];
      }
      this.isLoading = false;
    })

  }

  onSelect(id: number) {

  }

  createTestArray() {
    this.questions.forEach(value => {
      this.testArray.push({
        'id': value.id,
        'answer': null
      })
    })
  }

  @HostListener('window:keyup.arrowUp', ['$event'])
  @HostListener('window:keyup.arrowDown', ['$event'])
  @HostListener('window:keyup.arrowRight', ['$event'])
  @HostListener('window:keyup.arrowLeft', ['$event'])
  @HostListener('window:keyup.enter', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    console.log(event.key);
    if (event.key == 'ArrowRight') {
      this.getNextOrPreviousQuestion(false);
    }
    if (event.key == 'ArrowLeft') {
      this.getNextOrPreviousQuestion(true);
    }
     if (event.key == 'ArrowUp') {
       this.getNextOrPreviousAnswer(false);
     }
     if (event.key == 'ArrowDown') {
       this.getNextOrPreviousAnswer(true);
     }
    if (event.key == 'Enter') {
      if (this.currentQuestionNumber == this.questions.length - 1 && this.testArray[this.currentQuestionNumber].answer != null) {
        const queryParams: any = {};
        queryParams.myArray = JSON.stringify(this.testArray);
        const navigationExtras: NavigationExtras = {
          queryParams
        };
        this.router.navigate(['result'], navigationExtras)
      } else {
        this.getNextOrPreviousAnswer(true);
      }
    }
  }

  getNextOrPreviousQuestion(isNext: boolean) {
    if (isNext) {
      this.currentQuestionNumber = (this.currentQuestionNumber + 1) % this.questions.length;
    } else {
      if (this.currentQuestionNumber == 0) {
        this.currentQuestionNumber = this.questions.length - 1;
      } else {
        --this.currentQuestionNumber;
      }
    }
    console.log(this.currentQuestionNumber);
  }

  getNextOrPreviousAnswer(isNext: boolean) {
    if (this.testArray[this.currentQuestionNumber].answer == null) {
      this.testArray[this.currentQuestionNumber].answer = 0;
    } else if (isNext) {
      this.testArray[this.currentQuestionNumber].answer = (this.testArray[this.currentQuestionNumber].answer + 1) %
        this.questions[this.currentQuestionNumber].possible_answers.length;
    } else {
      if (this.testArray[this.currentQuestionNumber].answer == 0) {
        this.testArray[this.currentQuestionNumber].answer = this.questions[this.currentQuestionNumber].possible_answers.length - 1;
      } else {
        --this.testArray[this.currentQuestionNumber].answer;
      }
    }
  }

  getIsSelectedClass(val: number) {
    if (val === this.testArray[this.currentQuestionNumber].answer) {
      return 'selection-selected'
    }

    return 'selection';
  }
}
