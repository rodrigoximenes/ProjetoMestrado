import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  title: string = 'Categorizing technical debt types in machine learning code';
  subTitle: string = '';
  body: string =
    'Thesis presented to the Programa de Pós–graduação em Informática ' +
    'da PUC-Rio in partial fulfillment of the requirements for ' +
    'the degree of Mestre em Informática';

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.onChangeComponentName('About');
  }
}
