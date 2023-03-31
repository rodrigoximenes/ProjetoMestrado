import { Debt } from "./debt";

export class Workflow {
  id: number = 0;
  step: number = 0;
  name: string = '';
  nameDb: string ='';
  potentialDebts: Debt[] = [];
}
