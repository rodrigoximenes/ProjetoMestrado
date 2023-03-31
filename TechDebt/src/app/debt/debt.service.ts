import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Debt } from '../model/debt';
import { Workflow } from '../model/workflow';

@Injectable({
  providedIn: 'root'
})
export class DebtService {

  private readonly ApiDebts: string = 'http://localhost:3000/debts';

  constructor(private http: HttpClient) { }

  saveTechDebt(debt: Debt): Observable<Debt>{
    return this.http.post<Debt>(this.ApiDebts, debt);
  }

  updateTechDebt(debt: Debt): Observable<Debt>{
    return this.http.put<Debt>(`${this.ApiDebts}/${debt.id}`, debt);
  }

  deleteTechDebt(debt: Debt): Observable<Debt>{
    return this.http.delete<Debt>(`${this.ApiDebts}/${debt.id}`);
  }

  getTechDebtById(id:number): Observable<Workflow>{
    return this.http.get<Workflow>(`${this.ApiDebts}/${id}`);
  }

  getAllDebts(): Observable<Debt[]>{
    return this.http.get<Debt[]>(this.ApiDebts);
  }
}
