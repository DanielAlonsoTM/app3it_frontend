import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Poll } from "../shared/poll";

@Injectable({
    providedIn: 'root'
})
export class PollService {
    private baseURL = 'http://localhost:8080/api';

    constructor(private http: HttpClient) { }

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    addPoll(data: any): Observable<Poll> {
        return this.http
            .post<Poll>(
                `${this.baseURL}/polls/add`,
                JSON.stringify(data),
                this.httpOptions);
    }

    getResults(): Observable<Poll[]> {
        return this.http
            .get<Poll[]>(
                `${this.baseURL}/polls`,
                this.httpOptions
            );
    }
}