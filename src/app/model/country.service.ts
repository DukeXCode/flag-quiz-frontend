import {Injectable} from "@angular/core";
import {Country} from "./country";
import {Observable} from "rxjs";
import {CountryRestService} from "../adapter/country-rest.service";

export interface CountryState {
  countries: Country[];
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(private countryRestService: CountryRestService) {
  }

  getAll(): Observable<Country[]> {
    return this.countryRestService.getAll()
  }
}
