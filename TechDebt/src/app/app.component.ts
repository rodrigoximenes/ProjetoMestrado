import { AppService } from './app.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TechDebt';
  openSideNav: boolean = false;

  componentTitle:string = 'Technical debt types in machine learning code';

  constructor(private appService: AppService){
    this.appService.componentSelectedAction$.subscribe(name => this.componentTitle = name);
   }
}
