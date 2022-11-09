import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  private componentSelectedSubject = new Subject<string>();
  componentSelectedAction$ = this.componentSelectedSubject.asObservable();

  onChangeComponentName(name: string): void {
    this.componentSelectedSubject.next(name);
  }
}
