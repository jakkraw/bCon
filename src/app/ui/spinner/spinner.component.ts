import {Component, OnDestroy, OnInit} from '@angular/core';
import {SpinnerService} from "./spinner.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'aviko-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  visible = false;
  visibilitySubscription: Subscription;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.visibilitySubscription = this.spinnerService.stateChange
      .subscribe(visible => this.visible = visible);
  }

  ngOnDestroy(): void {
    this.visibilitySubscription.unsubscribe();
  }

}
