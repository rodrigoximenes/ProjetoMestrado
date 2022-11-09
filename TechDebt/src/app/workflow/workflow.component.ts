import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { plainToInstance } from 'class-transformer';
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
export class WorkflowComponent implements OnInit {
  steps: Workflow[] = [];
  displayedColumns: string[] = ['step', 'name'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: Workflow | null = null;

  constructor(private workflowService: WorkflowService) {}

  ngOnInit(): void {
    this.workflowService.getAllWorflowSteps().subscribe((steps: Workflow[]) => {
      this.steps = plainToInstance(Workflow, steps);
    });
  }
}
