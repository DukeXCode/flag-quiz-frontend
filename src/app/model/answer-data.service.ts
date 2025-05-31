import { Injectable } from '@angular/core';
import { AnswerRestService } from '../adapter/answer-rest.service';
import { AnswerData } from './answer-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnswerDataService {
  constructor(private answerRestService: AnswerRestService) {}

  post(data: AnswerData): Observable<AnswerData> {
    return this.answerRestService.post(data);
  }

  getWrongAnswers(countryId: number): Observable<number[]> {
    return this.answerRestService.getWrongAnswers(countryId);
  }
}
