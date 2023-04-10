import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Debt } from '../model/debt';
import { AppService } from './../app.service';
import { DebtService } from './debt.service';
import { WorkflowService } from '../workflow/workflow.service';

@Component({
  selector: 'app-debt',
  templateUrl: './debt.component.html',
  styleUrls: ['./debt.component.css'],
})
export class DebtComponent implements OnInit {
  debtForm!: FormGroup;
  debt = new Debt();
  debtMessage!: string;

  private validationMessages = {
    required: 'Please enter your new debt.',
  };

  constructor(
    private appService: AppService,
    private debtService: DebtService,
    private workflowService: WorkflowService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.appService.onChangeComponentName('Create Debts');

    this.debtForm = this.fb.group({
      debt: ['', [Validators.required, Validators.minLength(3)]],
      workflow: ['', Validators.required],
    });
  }

  get debtControl(): FormControl {
    return this.debtForm.get('debt') as FormControl;
  }

  getErrorMessage() {
    if (this.debtControl.hasError('required')) {
      return 'You must enter a value';
    }

    return this.debtControl.hasError('required') ? 'Choose one step' : '';
  }
}
