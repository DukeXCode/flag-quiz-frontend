import { Component, EventEmitter, Output } from '@angular/core';

export type QuizMode = 'infinite' | 'limited';

@Component({
  selector: 'app-start-screen',
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss',
})
export class StartScreenComponent {
  @Output() modeSelected = new EventEmitter<QuizMode>();

  select(mode: QuizMode): void {
    this.modeSelected.emit(mode);
  }
}
