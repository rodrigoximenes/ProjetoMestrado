import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Debt } from '../model/debt';
import { AppService } from './../app.service';
import { DebtService } from './debt.service';
import { WorkflowService } from '../workflow/workflow.service';
import { Workflow } from '../model/workflow';
import { takeWhile, Observable, concatMap, combineLatest, forkJoin, catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-debt',
  templateUrl: './debt.component.html',
  styleUrls: ['./debt.component.css'],
})
export class DebtComponent implements OnInit, OnDestroy {
  debtForm!: FormGroup;
  debt = new Debt();
  debtMessage!: string;
  workflowSteps: Workflow[] = [];
  componentActive: boolean = true;
  id!: string | null;

  private validationMessages = {
    required: 'Please enter your new debt.',
  };

  constructor(
    private appService: AppService,
    private debtService: DebtService,
    private workflowService: WorkflowService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.appService.onChangeComponentName('Create Debts');

    this.debtForm = this.fb.group({
      debt: ['', [Validators.required, Validators.minLength(3)]],
      workflow: ['', Validators.required],
      comment: [''],
    });

    this.workflowService.getAllWorflowSteps()
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(workflowSteps => this.workflowSteps = workflowSteps);

    this.route.paramMap
      .pipe(takeWhile(()=> this.componentActive))
      .subscribe(params => {
        this.id = params.get("id");

        if(this.id){
          this.appService.onChangeComponentName('Edit Debt: ' + this.id );

          this.debtService.getTechDebtById(+this.id)
          .pipe(
            takeWhile(() => this.componentActive),
            catchError(error => {
              console.error('Error fetching tech debt:', error);
              this.router.navigate(['**']);
              return throwError(error);
            })
          )
          .subscribe(debt => {
            forkJoin({
              workflow: this.workflowService.getWorflowStepById(debt.idWorkflowStep)
                .pipe(
                  catchError(error => {
                    console.error('Error fetching workflow step:', error);
                    this.router.navigate(['**']);
                    return throwError(error);
                  })
                ),
            }).pipe(
              takeWhile(() => this.componentActive),
              catchError(error => {
                console.error('Error combining observables:', error);
                this.router.navigate(['**']);
                return throwError(error);
              })
            )
            .subscribe(({ workflow }) => {
              this.debtForm.patchValue({
                debt: debt.name,
                workflow: workflow,
                comment: debt.comment
              });
            });
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  get debtControl(): FormControl {
    return this.debtForm.get('debt') as FormControl;
  }

  get workflowControl(): FormControl {
    return this.debtForm.get('workflow') as FormControl;
  }

  get commentControl(): FormControl {
    return this.debtForm.get('comment') as FormControl;
  }

  getErrorMessage() {
    if (this.debtControl.hasError('required')) {
      return 'You must enter a value';
    }

    return this.debtControl.hasError('minlength') ? 'Required Length: 3' : '';
  }

  compareWorkflow(n1: any, n2: any) {
    return n1 && n2 && n1.id === n2.id;
  }

  save(){
    this.debt.name = this.debtControl.value;
    this.debt.idWorkflowStep = this.workflowControl.value.id;
    this.debt.comment = this.commentControl.value;

    if(this.id){
      this.debt.id = +this.id;
      this.debtService.updateTechDebt(this.debt).subscribe(() =>{
        this.snackBar.open("Debt updated",'Close',{
          duration: 2000,
          horizontalPosition: "center",
          verticalPosition: "top" });
          this.router.navigate(['/workflow', this.debt.idWorkflowStep ]);
      })
    }else{
      this.debtService.saveTechDebt(this.debt).subscribe(() =>{
        this.snackBar.open("Debt saved",'Close',{
          duration: 2000,
          horizontalPosition: "center",
          verticalPosition: "top" });
        this.clearForm();
      })
    }
  }

  clearForm(): void{
    this.debtForm.reset();
    for(let name in this.debtForm.controls) {
      this.debtForm.controls[name].setErrors(null);
    }
  }
}
