import { Debt } from "./debt";

export class Workflow {
  id: number = 0;
  step: string = '';
  potentialDebts: Debt[] = [];
}
