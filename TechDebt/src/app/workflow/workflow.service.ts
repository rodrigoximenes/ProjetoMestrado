import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workflow } from '../model/workflow';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  private readonly ApiWorkflowSteps: string = 'http://localhost:3000/workflow_steps';

  constructor(private http: HttpClient) { }

  getAllWorflowSteps(): Observable<Workflow[]>{
    return this.http.get<Workflow[]>(this.ApiWorkflowSteps);
  }

  getWorflowStepById(id:number): Observable<Workflow>{
    return this.http.get<Workflow>(`${this.ApiWorkflowSteps}/${id}`);
  }

  updateWorflowStep(workflow: Workflow): Observable<Workflow>{
    return this.http.put<Workflow>(`${this.ApiWorkflowSteps}/${workflow.id}`, workflow);
  }

}
