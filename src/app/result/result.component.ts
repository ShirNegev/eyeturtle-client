import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuestionService} from "../../services/question.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  isLoading = true;
  result = 0;

  constructor(private activatedRoute: ActivatedRoute, private questionService: QuestionService, private userService: UserService) {
    const test = this.activatedRoute.snapshot.queryParamMap.get('myArray');
    if (test !== null) {
      questionService.checkTest(JSON.parse(test), userService.getCurrId()).subscribe(value => {
        this.isLoading = false;
        this.result = value;
      });
    } else {
    }


  }

  ngOnInit(): void {
  }

}
