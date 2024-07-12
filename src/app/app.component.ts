// src/app/app.component.ts
import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-shop';
  username = '';
  searchQuery = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUserById(1).subscribe(
      (data: User) => {
        this.username = data.username;
      },
      (error: any) => {
        console.error('Error fetching user:', error);
      }
    );
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value;
    this.searchQuery = query;
    this.router.navigate(['/products'], { queryParams: { search: query } });
  }
}
