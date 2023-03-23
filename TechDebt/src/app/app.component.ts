import { AppService } from './app.service';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { WorkflowService } from './workflow/workflow.service';
import { plainToInstance } from 'class-transformer';
import { Workflow } from './model/workflow';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TechDebt';
  openSideNav: boolean = false;
  steps: Workflow[]=[];

  componentTitle:string = 'Technical debt types in machine learning code';

  constructor(private appService: AppService,
              private router: Router,
              private workflowService: WorkflowService){
    this.appService.componentSelectedAction$.subscribe(name => this.componentTitle = name);

    this.workflowService.getAllWorflowSteps().subscribe((steps: Workflow[]) => {
      this.steps = plainToInstance(Workflow, steps);
    });
  }

   goToRouterLink(stepWorkflow: Workflow){
    this.router.navigate(['workflow', stepWorkflow.step])
    this.openSideNav = false;
   }
}
