// src/app/services/chatbot.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private chatUrl = 'http://localhost:3000/chat';

  constructor(private http: HttpClient) {}

  public getResponse(message: string): Observable<any> {
    return this.http.post<any>(this.chatUrl, { message });
  }
}
