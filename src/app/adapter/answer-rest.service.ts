import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {requestHeaders} from "../rest-helper";
import {AnswerData} from "../model/answer-data";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AnswerRestService {
  private url = `${environment.url}/rest/v1/answers`;

  constructor(private readonly http: HttpClient) {
  }

  public post(data: AnswerData): Observable<AnswerData> {
    return this.http.post<AnswerData>(this.url, data, {headers: requestHeaders})
  }

  public getWrongAnswers(countryId: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.url}/wrong/countries/${countryId}`, {headers: requestHeaders})
  }
}
