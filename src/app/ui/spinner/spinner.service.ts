import {Subject} from "rxjs/Subject";

export class SpinnerService {
  stateChange = new Subject<boolean>();

  constructor() { }

  start() {
    this.stateChange.next(true);
  }

  stop() {
    this.stateChange.next(false);
  }
}
