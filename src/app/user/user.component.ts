// user.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'; // Assuming UserService is implemented to fetch user data
import { User } from '../models/user'; // Import the User interface
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getUserById(1).subscribe(
      (data: User) => {
        this.user = data;
      },
      (error: any) => { // Explicitly define the type of error parameter as 'any'
        console.error('Error fetching user:', error);
      }
    );
  }
}
