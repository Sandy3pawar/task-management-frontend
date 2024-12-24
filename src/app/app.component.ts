import { Component, OnInit } from '@angular/core';
import { ToastService } from '../app/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task-management App';
  constructor(private toastService: ToastService) { }

  ngOnInit() {
  }
}
