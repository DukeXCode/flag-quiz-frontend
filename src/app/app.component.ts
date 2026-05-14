import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuizStepComponent } from './quiz-step/quiz-step.component';
import { StartScreenComponent, QuizMode } from './start-screen/start-screen.component';
import { GameOverComponent } from './game-over/game-over.component';
import { CountryService } from './model/country.service';
import { Country } from './model/country';


@Component({
    selector: 'app-root',
    imports: [RouterOutlet, QuizStepComponent, StartScreenComponent, GameOverComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  protected countries: Country[] = [];
  protected mode: QuizMode | null = null;
  protected score = 0;
  protected flagsAnswered = 0;
  protected finished = false;
  protected readonly flagLimit = 15;

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

  onModeSelected(mode: QuizMode) {
    this.mode = mode;
    this.resetCounters();
  }

  nextQuestion(isCorrectAnswer: boolean) {
    if (isCorrectAnswer) {
      this.score++;
    }
    this.flagsAnswered++;
    if (this.mode === 'limited' && this.flagsAnswered >= this.flagLimit) {
      this.finished = true;
    }
  }

  playAgain() {
    this.resetCounters();
  }

  backToMenu() {
    this.resetCounters();
    this.mode = null;
  }

  private resetCounters() {
    this.score = 0;
    this.flagsAnswered = 0;
    this.finished = false;
  }
}
