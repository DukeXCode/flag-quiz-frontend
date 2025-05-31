import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Country } from '../model/country';
import { requestHeaders } from '../rest-helper';

@Injectable({
  providedIn: 'root',
})
export class CountryRestService {
  private url = `${environment.url}/rest/v1/countries`;

  constructor(private readonly http: HttpClient) {}

  public getAll(): Observable<Country[]> {
    return this.http.get<Country[]>(this.url, { headers: requestHeaders });
  }
}
