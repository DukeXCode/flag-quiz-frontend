import {COUNTRIES} from "./country-definiton";
import {Injectable} from "@angular/core";
import {SupabaseService} from "../supabase.service";

@Injectable({
  providedIn: 'root'
})
export class CountyService {
  constructor(private supabaseService: SupabaseService) {}

  public getAll() {
    return this.supabaseService.allCountries()
  }
}
