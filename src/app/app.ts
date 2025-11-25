import { Component, signal } from '@angular/core';
import { Test } from './test/test';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Test,CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  protected readonly title = signal('Hello-World');
  currentSignal = "";
  remainingTime = 0;

  onSignal(data: { signal: string; time: number }) {
    this.currentSignal = data.signal;
    this.remainingTime = data.time;
  }
}
