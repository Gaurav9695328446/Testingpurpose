import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private subject = new Subject<any>();
    private loginSubject = new Subject<any>();
    public isLoggedIn = false;
    private userEmail : string = "";

    setLoginStatus(message: boolean) {
        if(message) {
            this.isLoggedIn = true;
        } else {
            this.isLoggedIn = false;
        }
        this.subject.next({ text: message });
    }

    clearMessage() {
        this.subject.next();
    }

    getLoginStatus(): Observable<any> {
        return this.subject.asObservable();
    }

    openLoginPopup(isOpen : boolean) {
        this.loginSubject.next({isOpen: isOpen});
    }
    getLoginPopup() {
        return this.loginSubject.asObservable();
    }

    setUserEmailId(email) {
        this.userEmail = email;
    }

    getUserEmailId() {
        return this.userEmail;
    }
}