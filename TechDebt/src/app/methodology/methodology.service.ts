import { MethodologyStep } from './../model/methodology_step';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Workflow } from '../model/workflow';

@Injectable({
  providedIn: 'root'
})
export class MethodologyService {

private readonly ApiMethodologySteps: string = 'http://localhost:3000/methodology_steps';

  constructor(private http: HttpClient) { }

  getAllMethodologySteps(): Observable<MethodologyStep[]>{
    return this.http.get<MethodologyStep[]>(this.ApiMethodologySteps);
  }
}
