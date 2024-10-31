import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-private-route',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './private-route.component.html',
  styleUrl: './private-route.component.scss',
})
export class PrivateRouteComponent {
  constructor(private router: Router, private userService: UserService) {
    if (!this.user) this.router.navigateByUrl('/');
  }

  get user() {
    return this.userService.getUser();
  }
}
