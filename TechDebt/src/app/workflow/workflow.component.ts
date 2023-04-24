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
import { Debt } from '../model/debt';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  debts: Debt[] = [];
  displayedColumns: string[] = ['id', 'name'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'action', 'expand'];
  expandedElement: Debt | null = null;
  stepNumber!: string | null;
  componentActive: boolean = true;

  constructor(private workflowService: WorkflowService,
              private debtService: DebtService,
              private appService: AppService,
              private route: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {

    this.route.paramMap
    .pipe(takeWhile(()=> this.componentActive))
    .subscribe(params => {
      this.stepNumber = params.get("stepNumber");

      if(this.stepNumber){
        this.workflowService.getWorflowStepById(+this.stepNumber)
        .pipe(takeWhile(()=> this.componentActive))
          .subscribe(workflow => {
            this.appService.onChangeComponentName(workflow.name);

            this.restoreDataSource();
          })
      }
    })
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  restoreDataSource():void{
    if(this.stepNumber){
      this.debtService.getDebtsWorkflowStep(+this.stepNumber)
      .pipe(takeWhile(()=> this.componentActive))
      .subscribe(debts =>{
        this.debts = [...debts];
      })
    }
  }

  edit(debt:Debt){
    this.router.navigate(['/debt', debt.id ]);
  }

  delete(debt:Debt){
    this.debtService.deleteTechDebt(debt).subscribe(() =>{
      this.restoreDataSource();
      this.snackBar.open("Debt deleted",'Close',{
        duration: 2000,
        horizontalPosition: "center",
        verticalPosition: "top" });
    })
  }
}
