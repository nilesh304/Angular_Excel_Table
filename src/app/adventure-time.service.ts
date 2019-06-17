import { Injectable } from '@angular/core';
import {AppComponent} from "./app.component";
import { Observable } from 'rxjs';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdventureTimeService {

  constructor(private myapp :AppComponent) { }

  getColumn() :string[]
  {
    return this.myapp.keys;
  }
  getCharacters():Observable<any[]>{
      return of(this.myapp.data);
  }
}
