import { Component, OnInit } from '@angular/core';
import { fromEvent, map, buffer, filter, debounceTime } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  minutes = 0;
  stringMinutes = "00";
  seconds = 0;
  stringSeconds = "00"
  timer = "00 : 00";
  interval: any;
  isStopped = true;
  buttonText = "Start";

  constructor() { }

  startStop() {
    if( this.isStopped )
    this.startTimer();
    else {
      clearInterval(this.interval);
      this.reset();
    }
    this.isStopped = !this.isStopped;
    this.changeButtonText();
  }

  changeButtonText() {
    this.buttonText = this.isStopped ? "Start" : "Stop";
  }

  startTimer() {
    this.interval = setInterval(() => {

      if( this.seconds === 59 ) {
        this.minutes++;
        this.seconds = 0;
      }
      else
      this.seconds++;

      this.seconds < 10 ? this.stringSeconds = `0${this.seconds}` : this.stringSeconds = `${this.seconds}`;
      this.minutes < 10 ? this.stringMinutes = `0${this.minutes}` : this.stringMinutes = `${this.minutes}`;
  
      this.timer = `${this.stringMinutes} : ${this.stringSeconds}`;
    }, 1000);
  }

  reset() {
    this.minutes = 0;
    this.stringMinutes = "00";
    this.seconds = 0;
    this.stringSeconds = "00"
    this.timer = "00 : 00";
  }

  ngOnInit(): void {
    const click$ = fromEvent(document, 'click');

    const doubleClick$ = click$.pipe(
      buffer(click$.pipe(debounceTime(500))),
      map((clicks) => clicks.length),
      filter((clicksLength) => clicksLength >= 2)
    );

    doubleClick$.subscribe(() => {
      clearInterval(this.interval);
      this.isStopped = true;
      this.changeButtonText();
    });
  }
}
