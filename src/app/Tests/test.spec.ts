import { FetchFlightService } from './../Services/fetch-flight.service';
import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

// test suite to test fetch-flight.service
describe('FetchFlightService testing', () => {

  let service: FetchFlightService;
  let param1: any;
  let param2: any;
  let param3: any;

  beforeEach(() => {
    service =  new FetchFlightService();
  });

  // test case to test whether service is called
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // test case to test whether required method has been called or not
  it('should fetch data for flight from JSON', () => {

    let spy = spyOn(service, 'fetchOneWayFlights').and.callFake(t => {
      return Observable.empty();
    })

    service.fetchOneWayFlights(param1,param3,param3);

    expect(spy).toHaveBeenCalled();

  });

});
