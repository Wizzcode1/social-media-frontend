import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  @Output() postCreated = new EventEmitter<void>();

  postForm!: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      content: ['', [Validators.required, Validators.maxLength(280)]]
    });
  }

  onSubmit() {
    if (this.postForm.invalid) return;

    const content = this.postForm.value.content;
    this.postService.createPost(content).subscribe({
      next: () => {
        this.postForm.reset();
        this.postCreated.emit();
      },
      error: (err) => console.error('Failed to create post:', err)
    });
  }
}
