import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AppService } from './app.service';
import { TestBed } from '@angular/core/testing';

describe('AppService', () => {
  let service: AppService;
  let http: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Mock HttpClient
    });
    service = new AppService(http);
    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('returns value', () => {
    http
      .get('https://jsonplaceholder.typicode.com/todos')
      .subscribe((data) => expect(data).toReturn());
  });

  it('returns object value from observable', () => {
    service.getAllTodos().subscribe((value) => {
      expect(typeof value).toBe('object');
    });
  });
});
