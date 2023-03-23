import { Debt } from "./debt";

export class Workflow {
  step: number = 0;
  name: string = '';
  nameDb: string ='';
  potentialDebts: Debt[] = [];
}
