import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Country} from "../model/country";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Answer} from "../model/answer";
import {AnswerDataService} from "../model/answer-data.service";
import {AnswerData} from "../model/answer-data";

@Component({
  selector: 'app-quiz-step',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    NgIf
  ],
  templateUrl: './quiz-step.component.html',
  styleUrl: './quiz-step.component.scss'
})
export class QuizStepComponent implements OnInit {

  constructor(private answerDataService: AnswerDataService) {
  }

  @Input() countries!: Country[];
  @Output() nextQuestion = new EventEmitter<boolean>();
  correctCountry: Country | undefined = undefined;
  answers: Answer[] = [];
  private isAnsweredCorrectly = false;

  ngOnInit(): void {
    this.correctCountry = this.getRandomCountry()
    this.answers = this.getAnswers()
  }

  private getAnswers(): Answer[] {
    const answers = this.getWrongAnswers()
    answers.push(this.countryToAnswer(this.correctCountry!, true))
    this.shuffle(answers)
    return answers
  }

  private getWrongAnswers(): Answer[] {
    const wrongCountries: Country[] = []
    while (wrongCountries.length < 3) {
      const nextAnswer = (this.countries)[Math.floor(Math.random() * this.countries.length)]
      if (!wrongCountries.includes(nextAnswer) && nextAnswer !== this.correctCountry) {
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
    if (this.alreadyAnswered()) {
      return
    }

    let correctAnswer: Answer | undefined = undefined

    this.answers.forEach((answer, i) => {
      if (i === index) {
        answer.isSelected = true;
        if (answer.isCorrect) {
          this.isAnsweredCorrectly = true
          correctAnswer = this.answers[i]
        } else {
          this.isAnsweredCorrectly = false
          this.highlightCorrectAnswer()
        }
      }
    });

    if (correctAnswer === undefined) {
      correctAnswer = this.answers.filter((a) => a.isCorrect)[0]
    }
    this.submitAnswer(this.answers[index].country.id, correctAnswer!!.country.id)
  }

  private submitAnswer(selectedCountryId: number, correctCountyId: number) {
    const data: AnswerData = {
      selectedCountry: selectedCountryId,
      correctCountry: correctCountyId,
      isCorrect: selectedCountryId === correctCountyId
    }
    this.answerDataService.post(data).subscribe(() => console.log('Answer successfully submitted'))
  }

  private highlightCorrectAnswer() {
    this.answers.forEach((answer) => {
      if (answer.isCorrect) {
        answer.isSelected = true
      }
    })
  }

  alreadyAnswered() {
    for (let answer of this.answers) {
      if (answer.isSelected) {
        return true;
      }
    }
    return false;
  }

  getFlagPath(): string {
    return 'assets/flags/' + this.correctCountry?.iso2.toLowerCase().concat('.png');
  }

  next() {
    this.nextQuestion.emit(this.isAnsweredCorrectly);
    this.correctCountry = this.getRandomCountry()
    this.answers = this.getAnswers()
  }

  private getRandomCountry(): Country {
    return this.countries[Math.floor(Math.random() * this.countries.length)];
  }
}
