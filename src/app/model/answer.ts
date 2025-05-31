import { Country } from './country';

export interface Answer {
  country: Country;
  isCorrect: boolean;
  isSelected: boolean;
}
