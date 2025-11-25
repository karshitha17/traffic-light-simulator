import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.html',
  styleUrls: ['./test.scss'],
})
export class Test {
  colors = ['red', 'yellow', 'green'];   
  index = 0;

  durations: any = {                     
    red: 5,
    yellow: 3,
    green: 4
  };

  timer = 0;
  interval: any;
  isRunning = false;

  @Output() signalChanged = new EventEmitter<{ signal: string; time: number }>();

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.startTimer();
  }

  stop() {
    this.isRunning = false;
    clearInterval(this.interval);
  }

  startTimer() {
    const currentColor = this.colors[this.index];
    this.timer = this.durations[currentColor];

    this.signalChanged.emit({
      signal: currentColor,
      time: this.timer,
    });

    clearInterval(this.interval);

    this.interval = setInterval(() => {
      if (!this.isRunning) return;

      this.timer--;

      this.signalChanged.emit({
        signal: currentColor,
        time: this.timer,
      });

      if (this.timer === 0) {
        this.changeSignal();
      }
    }, 1000);
  }

  changeSignal() {
    this.index = (this.index + 1) % this.colors.length;
    this.startTimer();
  }

  manualNext() {
    this.changeSignal();
  }
}
