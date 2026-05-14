import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game-over',
  imports: [],
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.scss',
})
export class GameOverComponent {
  @Input({ required: true }) score!: number;
  @Input({ required: true }) total!: number;
  @Output() playAgain = new EventEmitter<void>();
  @Output() backToMenu = new EventEmitter<void>();

  get verdict(): string {
    const ratio = this.total > 0 ? this.score / this.total : 0;
    if (ratio === 1) return 'A masterful cartographer';
    if (ratio >= 0.8) return 'A seasoned navigator';
    if (ratio >= 0.5) return 'A capable explorer';
    if (ratio > 0) return 'The voyage has only begun';
    return 'Uncharted waters await';
  }

  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.playAgain.emit();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.backToMenu.emit();
    }
  }
}
