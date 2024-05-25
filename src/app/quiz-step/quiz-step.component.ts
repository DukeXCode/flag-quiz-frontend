import {Component, Input} from '@angular/core';
import {Country} from "../model/country";
import {NgOptimizedImage} from "@angular/common";

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
}
