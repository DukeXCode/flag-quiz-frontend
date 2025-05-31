import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuizStepComponent } from './quiz-step/quiz-step.component';
import { CountryService } from './model/country.service';
import { Country } from './model/country';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QuizStepComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  protected countries: Country[] = [];
  score: number = 0;

  constructor(private countyService: CountryService) {}

  ngOnInit() {
    this.fetchCountries();
  }

  private fetchCountries() {
    this.countyService.getAll().subscribe({
      next: countries => {
        this.countries = countries;
      },
      error: error => {
        console.error('Error fetching countries:', error);
      },
    });
  }

  nextQuestion(isCorrectAnswer: boolean) {
    if (isCorrectAnswer) {
      this.score++;
    }
  }
}
