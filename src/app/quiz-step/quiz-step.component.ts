import {Component, Input, OnInit} from '@angular/core';
import {Country} from "../model/country";
import {NgClass, NgForOf, NgOptimizedImage} from "@angular/common";
import {Answer} from "../model/answer";

@Component({
  selector: 'app-quiz-step',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass,
    NgForOf
  ],
  templateUrl: './quiz-step.component.html',
  styleUrl: './quiz-step.component.scss'
})
export class QuizStepComponent implements OnInit {

  @Input() county!: Country;
  @Input() countries!: Country[];
  answers: Answer[] = [];

  ngOnInit(): void {
    const answers = this.getWrongAnswers()
    answers.push(this.countryToAnswer(this.county, true))
    this.shuffle(answers)
    this.answers = answers
  }

  private getWrongAnswers(): Answer[] {
    const wrongCountries: Country[] = []
    while (wrongCountries.length < 3) {
      const nextAnswer = (this.countries)[Math.floor(Math.random() * this.countries.length)]
      if (!wrongCountries.includes(nextAnswer) && nextAnswer !== this.county) {
        wrongCountries.push(nextAnswer)
      }
    }
    const wrongAnswers: Answer[] = []
    wrongCountries.forEach((country) => {
      wrongAnswers.push(this.countryToAnswer(country, false));
    })
    return wrongAnswers;
  }

  private countryToAnswer(country: Country, isCorrect: boolean): Answer {
    return {
      country: country,
      isCorrect: isCorrect,
      isSelected: false,
    }
  }

  private shuffle(array: any[]): void {
    let currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]
      ];
    }
  }

  checkAnswer(index: number) {
    // Don't allow changing of answer / multiple answers
    if (!this.alreadyAnswered()) {
      this.answers.forEach((answer, i) => {
        if (i === index) {
          answer.isSelected = true;
          if (answer.isCorrect) {
            console.log('Answer is correct')
            // TODO add event to store points
          } else {
            console.log('Answer is incorrect')
            this.answers.forEach((answer) => {
              if (answer.isCorrect) {
                answer.isSelected = true
              }
            })
          }
        }
      });
    }
  }

  private alreadyAnswered() {
    for (let answer of this.answers) {
      if (answer.isSelected) {
        return true;
      }
    }
    return false;
  }

  getFlagPath(): string {
    return 'assets/flags/' + this.county.name.toLowerCase()
      .replace(/\s+/g, '-') // Replace all spaces with '-'
      .concat('.png');
  }
}
