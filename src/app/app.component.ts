import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {QuizStepComponent} from "./quiz-step/quiz-step.component";
import {COUNTRIES} from "./model/country-definiton";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QuizStepComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'flag-quiz-frontend';
  protected readonly COUNTRIES = COUNTRIES;
}
