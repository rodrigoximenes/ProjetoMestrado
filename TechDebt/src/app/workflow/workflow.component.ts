import { DebtService } from './../debt/debt.service';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { AppService } from './../app.service';
import { Workflow } from './../model/workflow';
import { WorkflowService } from './workflow.service';

@Component({
  selector: 'workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css'],
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
export class WorkflowComponent implements OnInit, OnDestroy{
  steps: Workflow[] = [];
  displayedColumns: string[] = ['step', 'name'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: Workflow | null = null;
  stepNumber: number| null = null;
  componentActive: boolean = true;

  constructor(private workflowService: WorkflowService,
              private debtService: DebtService,
              private appService: AppService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.route.paramMap
    .pipe(takeWhile(()=> this.componentActive))
    .subscribe(params => {
      let stepNumber = params.get("stepNumber") ?? 0;

      if(stepNumber){
        this.workflowService.getWorflowStepById(+stepNumber)
        .pipe(takeWhile(()=> this.componentActive))
          .subscribe(workflow => {
            this.steps = [workflow];
            this.appService.onChangeComponentName(this.steps[0].name);

            this.debtService.getDebtsWorkflowStep(+stepNumber)
            .pipe(takeWhile(()=> this.componentActive))
            .subscribe(debts =>{
              this.steps[0].potentialDebts = [...debts]
            })
          })
      }
    })
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
