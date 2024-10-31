import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { tCreatePostForm } from '../../interfaces/post.interface';

@Component({
  selector: 'app-post-create-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './post-create-form.component.html',
  styleUrl: './post-create-form.component.scss',
})
export class PostCreateFormComponent {
  constructor(private postService: PostService) {}

  postCreateForm = new FormGroup({
    category: new FormControl<string | null>(null),
    title: new FormControl<string | null>(null),
    content: new FormControl<string | null>(null),
  });

  submit() {
    const data = this.postCreateForm.value as tCreatePostForm;
    this.postService.create(data);
    this.postCreateForm.reset();
  }
}
