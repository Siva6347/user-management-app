import { CommonModule, TitleCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {
  @Input() users: any[] = [];
  headers: string[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    setTimeout(() => {
      this.http
        .get<any[]>('https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json')
        .subscribe((data) => {
          this.users = data;
          this.headers = Object.keys(data[0]);
          console.log(this.headers);
          console.log(this.users);
        });
    }, 1000);
  }
  goToDetails(user: any) {
    this.router.navigate(['/user', user.id]);
  }
}
