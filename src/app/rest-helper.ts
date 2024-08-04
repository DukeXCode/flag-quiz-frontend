import {environment} from "../environments/environment";
import {HttpHeaders} from "@angular/common/http";

export const requestHeaders = new HttpHeaders({
  "Content-Type": "application/json",
  "apikey": environment.supabaseKey
})
