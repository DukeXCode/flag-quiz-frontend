import {HttpHeaders} from "@angular/common/http";
import {key} from "./urlProvider";

export const requestHeaders = new HttpHeaders({
  "Content-Type": "application/json",
  "apikey": key
})
