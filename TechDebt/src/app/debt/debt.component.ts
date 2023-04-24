import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Debt } from '../model/debt';
import { AppService } from './../app.service';
import { DebtService } from './debt.service';
import { WorkflowService } from '../workflow/workflow.service';
import { Workflow } from '../model/workflow';
import { takeWhile } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  private validationMessages = {
    required: 'Please enter your new debt.',
  };

  constructor(
    private appService: AppService,
    private debtService: DebtService,
    private workflowService: WorkflowService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}


  ngOnInit(): void {
    this.appService.onChangeComponentName('Create Debts');

    this.debtForm = this.fb.group({
      debt: ['', [Validators.required, Validators.minLength(3)]],
      workflow: ['', Validators.required],
    });

    this.workflowService.getAllWorflowSteps()
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(workflowSteps => this.workflowSteps = workflowSteps);
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

  getErrorMessage() {
    if (this.debtControl.hasError('required')) {
      return 'You must enter a value';
    }

    return this.debtControl.hasError('minlength') ? 'Required Length: 3' : '';
  }

  save(form: FormGroup){
    this.debt.name = this.debtControl.value;
    this.debt.idWorkflowStep = this.workflowControl.value.id;

    this.debtService.saveTechDebt(this.debt).subscribe(() =>{
      this.snackBar.open("Debt saved",'Close',{
        duration: 2000,
        horizontalPosition: "left",
        verticalPosition: "top" });
      this.clearForm();
    })
  }

  clearForm(): void{
    this.debtForm.reset();
    for(let name in this.debtForm.controls) {
      this.debtForm.controls[name].setErrors(null);
    }
  }
}
