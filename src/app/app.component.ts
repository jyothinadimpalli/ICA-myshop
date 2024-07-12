import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-shop';
  username="";

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getUserById(1).subscribe(
      (data: User) => {
        this.username = data.username;
      },
      (error: any) => { // Explicitly define the type of error parameter as 'any'
        console.error('Error fetching user:', error);
      }
    );
  }
}
