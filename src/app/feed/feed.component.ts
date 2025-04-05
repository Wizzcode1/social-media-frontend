import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../shared/services/post.service';
import { Post } from '../shared/models/post.model';
import { CreatePostComponent } from '../shared/components/create-post/create-post.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatToolbar} from '@angular/material/toolbar';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule,
    CreatePostComponent,
    MatCardModule,
    ReactiveFormsModule, MatToolbar],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadFeed();
  }

  loadFeed() {
    this.postService.getFeed().subscribe({
      next: (data) => (this.posts = data),
      error: (err) => console.error('Error loading feed:', err)
    });
  }


}
