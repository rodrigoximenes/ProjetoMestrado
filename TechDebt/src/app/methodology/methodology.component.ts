import { MethodologyStep } from './../model/methodology_step';
import { AppService } from './../app.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { MethodologyService } from './methodology.service';

@Component({
  selector: 'methodology',
  templateUrl: './methodology.component.html',
  styleUrls: ['./methodology.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})

export class MethodologyComponent implements OnInit {
  steps: MethodologyStep[] = [];
  displayedColumns: string[] = ['id', 'name'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: MethodologyStep | null = null;

  constructor(
    private appService: AppService,
    private methodologyService: MethodologyService
  ) {}

  ngOnInit(): void {
    this.appService.onChangeComponentName('Methodology');

    this.methodologyService.getAllMethodologySteps().subscribe((steps: MethodologyStep[]) => {
      this.steps = plainToInstance(MethodologyStep, steps);
    });
  }
}
