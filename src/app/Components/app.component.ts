import { Component } from '@angular/core';
import { FetchFlightService } from "./../Services/fetch-flight.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FetchFlightService]
})
export class AppComponent {
  
  oneWay;
  twoWay;
  welcome;
  oneWayFlights = [];
  returnFlights = [];
  origin = null;
  destination = null;
  originDate = Date;
  returnDate = Date;
  value = 0;

  constructor(private fetchFlightService: FetchFlightService) {
    this.oneWay = false;
    this.twoWay = false;
    this.welcome = true;
  }

  // function to validate user-input
  validate = () => {
    if (this.origin != null && this.destination != null && this.originDate != null)
      return true;
  }

  // function to set and display flight results for one way
  setOneWayView = () => {

    if (this.validate()) {
      this.oneWayFlights = [];
      // calling service to fetch data in order to display
      this.fetchFlightService.fetchOneWayFlights(this.origin.toUpperCase(), this.destination.toUpperCase(), this.originDate.toString()).subscribe(response => {
        this.oneWayFlights = response;
      });
      if (this.oneWayFlights.length > 0) {
        this.oneWay = true;
        this.twoWay = false;
        this.welcome = false;
      }
      else {
        // displaying alert if no flights are available
        alert('No flights available');
      }
    }
    else {
      // displaying alert if all entries are not filled
      alert('Please fill all the entries');
    }
  }

  // function to set and display flight results for two way
  setTwoWayView = () => {
    if (this.validate()) {
      this.returnFlights = [];
      // calling service to fetch data in order to display
      this.fetchFlightService.fetchTwoWayFlights(this.origin.toUpperCase(), this.destination.toUpperCase(), this.originDate.toString(), this.returnDate.toString()).subscribe(response => {
        this.returnFlights = response;
      });
      if (this.returnFlights.length > 0) {
        this.oneWay = false;
        this.twoWay = true;
        this.welcome = false;
      }
      else {
        // displaying alert if no flights are available
        alert("No flights available");
      }
    }
    else {
      // displaying alert if all entries are not filled
      alert('Please fill all the entries');
    }
  }

  // function to apply filter for selected price range
  applyFilter = () => {
    let tempArray = [];
    if (this.oneWay == true) {
      this.setOneWayView();
      // filtering array for selected price range for one way
      tempArray = this.oneWayFlights.filter(flight => flight.price <= this.value);
      if (tempArray.length > 0) {
        this.oneWayFlights = tempArray;
      }
      else {
        alert("No flights in selected price range");
      }
    }
    else {
      this.setTwoWayView();
      // filtering array for selected price range for two way
      tempArray = this.returnFlights.filter(flight => ((flight.oneWayFlight.price + flight.twoWayFlight.price) <= this.value));
      if (tempArray.length > 0) {
        this.returnFlights = tempArray;
      }
      else {
        alert("No flights in selected price range");
      }
    }
  }
}
