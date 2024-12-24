import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private toastSubject = new BehaviorSubject<{ type: string, message: string } | null>(null);

    toast$ = this.toastSubject.asObservable();

    success(message: string) {
        this.toastSubject.next({ type: 'success', message });
    }

    error(message: string) {
        this.toastSubject.next({ type: 'error', message });
    }

    clear() {
        this.toastSubject.next(null);
    }
}









// import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';

// @Injectable({
//     providedIn: 'root'
// })
// export class ToastService {
//     private toastSubject = new Subject<{ type: string, message: string }>();
//     toast$ = this.toastSubject.asObservable(); // Observable to subscribe to

//     // Methods to trigger success and error toasts
//     success(message: string) {
//         this.showToast('success', message);
//     }

//     error(message: string) {
//         this.showToast('error', message);
//     }

//     private showToast(type: string, message: string) {
//         this.toastSubject.next({ type, message });
//     }
// }
