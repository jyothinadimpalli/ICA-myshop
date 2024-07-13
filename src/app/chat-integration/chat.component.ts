import { Component, OnInit } from '@angular/core';
import { ChatbotService } from '../services/chatbot.service';

interface Message {
  text: string;
  bot: boolean;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  userMessage: string = '';
  isOpen: boolean = false; // Variable to track chat window open/close state

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit(): void {}

  sendMessage(): void {
    if (this.userMessage.trim() === '') return;

    this.messages.push({ text: this.userMessage, bot: false });

    this.chatbotService.getResponse(this.userMessage).subscribe(response => {
      const botMessage: Message = { text: response.message, bot: true };
      this.messages.push(botMessage);
    });

    this.userMessage = '';
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen; // Toggle isOpen property
  }
}
