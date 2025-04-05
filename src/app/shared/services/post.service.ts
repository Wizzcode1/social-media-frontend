import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  private baseUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) {}

  getFeed(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/feed`);
  }

  createPost(content: string): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/create`, { content });
  }

}
