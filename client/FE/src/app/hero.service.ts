import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient) {

  }

  list: any = [];

  addTask(str: any) {
    return this.http.post("/api/task/create-task", str, {
      headers: new HttpHeaders({
        "ngrok-skip-browser-warning": "http://localhost:4200"
      })
    });
  }

  getTask(id: string) {
    return this.http.get("/api/task/read-task/" + id, {
      headers: new HttpHeaders({
        "ngrok-skip-browser-warning": "http://localhost:4200"
      })
    })
  }

  getAllTasks() {
    return this.http.get("/api/task/read-Alltask", {
      headers: new HttpHeaders({
        "ngrok-skip-browser-warning": "http://localhost:4200"
      })
    });

  }

  updateEstimateTask(data: any) {
    return this.http.post("/api/task/update-task", data, {
      headers: new HttpHeaders({
        "ngrok-skip-browser-warning": "http://localhost:4200"
      })
    });
  }

  updateTask(id: any, data: any) {
    return this.http.post("/api/task/task-base", data, {
      headers: new HttpHeaders({
        "ngrok-skip-browser-warning": "http://localhost:4200"
      })
    });
  }
}
