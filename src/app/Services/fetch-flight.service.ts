import { Injectable } from '@angular/core';
import { FLIGHTS } from './../../assets/mock-json';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class FetchFlightService {

  constructor() { }

  flightsJson = FLIGHTS;
  oneWayFlights = [];
  returnFlights = [];

  // function to set array for one way flights on required details
  fetchOneWayFlights(orig: string, dest: string, OrigDate: string) {
    this.oneWayFlights = [];
    for (var flight in this.flightsJson) {
      // checking input values
      if (this.flightsJson[flight].origin == orig
        && this.flightsJson[flight].destination == dest
        && this.flightsJson[flight].departDate == OrigDate
      ) {
        this.oneWayFlights.push(this.flightsJson[flight]);
      }
    }
    return Observable.of(this.oneWayFlights);
  }

  // function to set array for two way flights on required details
  fetchTwoWayFlights(orig: string, dest: string, origDate: string, returnDate: string) {
    this.returnFlights = [];
    let oneWayFlight = {};
    let twoWayFlight = {};
    for (var flight in this.flightsJson) {
      // checking input values for one way
      if (this.flightsJson[flight].origin == orig
        && this.flightsJson[flight].destination == dest
        && this.flightsJson[flight].departDate == origDate
      ) {
        oneWayFlight = this.flightsJson[flight];
        for (var flight in this.flightsJson) {
          // checking input values for return flights
          if (this.flightsJson[flight].origin == dest
            && this.flightsJson[flight].destination == orig
            && this.flightsJson[flight].departDate == returnDate
          ) {
            twoWayFlight = this.flightsJson[flight];
            this.returnFlights.push({ 'oneWayFlight': oneWayFlight, 'twoWayFlight': twoWayFlight });
          }
        }
      }
    }
    return Observable.of(this.returnFlights);
  }
}
