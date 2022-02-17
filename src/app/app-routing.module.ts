import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {TestComponent} from "./test/test.component";
import {ResultComponent} from "./result/result.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  {path: 'test', component: TestComponent},
  {path: 'result', component: ResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
