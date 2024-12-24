import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {
  toastMessage: string = '';
  toastType: string = '';
  toastTimeout: any;
  private toastSubscription: Subscription | undefined;

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    // Subscribe to toast notifications
    this.toastSubscription = this.toastService.toast$.subscribe((toast: any) => {
      // If there is a new message or the type changes, reset the timeout
      if (toast && (toast.message !== this.toastMessage || toast.type !== this.toastType)) {
        this.toastMessage = toast.message;
        this.toastType = toast.type;

        if (this.toastTimeout) {
          clearTimeout(this.toastTimeout);  // Clear previous timeout to reset the timer
        }

        // Set timeout to hide the toast after 36 seconds (36000ms)
        this.toastTimeout = setTimeout(() => {
          this.toastMessage = '';
          this.toastType = '';
        }, 36000); // Adjusted to 36 seconds
      }
    });
  }

  ngOnDestroy() {
    if (this.toastSubscription) {
      this.toastSubscription.unsubscribe();
    }
  }
}
