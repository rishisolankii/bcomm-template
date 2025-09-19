import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  standalone: false,
  templateUrl: './countdown-timer.component.html',
  styleUrl: './countdown-timer.component.scss'
})
export class CountdownTimerComponent {
  targetDate = new Date('2025-10-16T15:00:00+05:30').getTime();
  // @Input() targetDate!: any;
  countdownText: string = '';
  private intervalId: any;

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startCountdown() {
    this.intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = this.targetDate - now;

      if (distance <= 0) {
        this.countdownText = 'Expired!';
        clearInterval(this.intervalId);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.countdownText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
  }
}
