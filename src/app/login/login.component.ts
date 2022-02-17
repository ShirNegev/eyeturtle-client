import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
  }

  onSubmit(id: string) {
    console.log(id.length);
    if (id.length == 9) {
      this.userService.setCurrId(id);
      this.router.navigate(['test']);
    }
  }
}
