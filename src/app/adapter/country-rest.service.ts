import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Country} from "../model/country";
import {requestHeaders} from "../rest-helper";

@Injectable({
  providedIn: 'root'
})
export class CountryRestService {
  private url = `${url}/rest/v1/countries`;

  constructor(private readonly http: HttpClient) {
  }

  public getAll(): Observable<Country[]> {
    return this.http.get<Country[]>(this.url, {headers: requestHeaders})
  }
}
