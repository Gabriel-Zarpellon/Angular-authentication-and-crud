import { Component } from '@angular/core';
import { PrivateRouteComponent } from '../../components/private-route/private-route.component';
import { CommonModule } from '@angular/common';
import { PostCreateFormComponent } from '../../components/post-create-form/post-create-form.component';
import { PostEditFormComponent } from '../../components/post-edit-form/post-edit-form.component';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { iPost } from '../../interfaces/post.interface';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    PrivateRouteComponent,
    PostCreateFormComponent,
    PostEditFormComponent,
    CommonModule,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  constructor(
    private userService: UserService,
    private postService: PostService
  ) {}

  get user() {
    return this.userService.getUser();
  }

  get postList() {
    return this.postService.getPosts();
  }

  get editingPost() {
    return this.postService.getEditingPost();
  }

  handleEdit(post: iPost) {
    this.postService.setEditingPost(post);
  }

  handleRemove(id: number) {
    this.postService.delete(id);
  }

  handleLogout() {
    this.userService.logout();
  }
}
