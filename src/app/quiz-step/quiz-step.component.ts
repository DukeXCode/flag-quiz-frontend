import {Component, Input} from '@angular/core';
import {Country} from "../model/country";
import {NgOptimizedImage} from "@angular/common";
import {COUNTRIES} from "../model/country-definiton";

@Component({
  selector: 'app-quiz-step',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './quiz-step.component.html',
  styleUrl: './quiz-step.component.scss'
})
export class QuizStepComponent {
  @Input() county!: Country;
  answers: string[] = [];

  ngOnInit(): void {
    let answers = this.getWrongAnswers()
    answers.push(this.county.name)
    this.shuffle(answers)
    this.answers = answers
  }

  getWrongAnswers(): string[] {
    let wrongAnswers: string[] = []
    while (wrongAnswers.length < 3) {
      const nextAnswer = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)].name
      if (!wrongAnswers.includes(nextAnswer) && nextAnswer !== this.county.name) {
        wrongAnswers.push(nextAnswer)
      }
    }
    return wrongAnswers;
  }

  shuffle(array: any[]): void {
    let currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]
      ];
    }
  }
}
