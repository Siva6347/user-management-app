import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail {
  user: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    this.user = { id: userId, name: 'John Doe', email: 'john@example.com' };
  }
}
