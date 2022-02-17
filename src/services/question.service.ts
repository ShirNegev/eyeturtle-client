import { Injectable } from '@angular/core';
import {Question} from "../models/question";
import {Observable, of} from "rxjs";
import {Test} from "../models/test";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }

  getQuestion(): Observable<Question[]> {
    return of([
      {
        'id': 0,
        'content': 'איזה יום היום',
        'possible_answers': [
          'ראשון',
          'רביעי',
          'שלישי'
        ]
      },
      {
        'id': 1,
        'content': 'איזה יום מחר',
        'possible_answers': [
          'חמישי',
          'רביעי',
          'שלישי'
        ]
      },
      {
        'id': 2,
        'content': 'איזה יום היה אתמול',
        'possible_answers': [
          'ראשון',
          'רביעי',
          'שלישי'
        ]
      }
    ]);
  }

  checkTest(test: Test[], id: string): Observable<number> {
    return of(86);
  }
}
