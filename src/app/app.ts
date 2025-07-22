import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AirQuality } from './air-quality/air-quality';
import { Login } from './login/login';

@Component({
  selector: 'app-root',
  imports: [
    // RouterOutlet,
    // AirQuality,
    Login
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('practice-project');
}
