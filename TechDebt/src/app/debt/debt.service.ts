import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Debt } from '../model/debt';
import { Workflow } from '../model/workflow';

@Injectable({
  providedIn: 'root'
})
export class DebtService {

  private readonly ApiDebts: string = 'http://localhost:3000/debts';

  constructor(private http: HttpClient) { }

  saveTechDebt(debt: Debt): Observable<Debt>{

    console.log(debt);
    console.log(this.getMaxDebtIdRegistered())

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

  private getMaxDebtIdRegistered(): number{

    let id: number = 0;
    this.getAllDebts().pipe(map(debt =>{
      id = debt.reduce((item, curr) => {
            return item.id < curr.id ? curr : item;
          }).id;
    }));
console.log(id)
    return id;
  }
}
