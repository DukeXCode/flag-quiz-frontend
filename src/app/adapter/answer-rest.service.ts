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
  private url = `${environment.supabaseUrl}/rest/v1/answers`;

  constructor(private readonly http: HttpClient) {
  }

  public post(data: AnswerData): Observable<AnswerData> {
    return this.http.post<AnswerData>(this.url, data, {headers: requestHeaders})
  }
}
