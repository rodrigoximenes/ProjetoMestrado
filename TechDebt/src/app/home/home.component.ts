import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title: string = 'Categorizing technical debt types in machine learning code';
  subTitle:string = '';
  body: string = 'Machine learning systems have a special capacity for incurring ' +
  'technical debt because they have all of the maintenance problems of ' +
  'traditional code plus an additional set of ML-specific issues. ' +
  'This debt may be difficult to detect because it exists at the ' +
  'system level rather than the code-level. ' +
  'Traditional abstractions and boundaries ' +
  'may be subtly corrupted or invalidated by the fact that data influences ML ' +
  'system behavior. ' +
  'Typical methods for paying down code level technical debt are ' +
  'not sufficient to address ML-specific technical debt at the system level';


  constructor() { }

  ngOnInit(): void {
  }

}
