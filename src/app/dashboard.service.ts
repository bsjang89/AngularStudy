import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  bigChart() {
    return [{
      name: 'Boseok',
      data: [1, 10, 16, 20, 24, 30, 35]
    }, {
      name: 'Person1',
      data: [3, 20, 45, 50, 60, 70, 80]
    }, {
      name: 'Person2',
      data: [5, 10, 15, 20, 23, 27, 45]
    }];
  }
}
