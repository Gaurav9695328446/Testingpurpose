import { trigger, style, state, transition, animate } from "@angular/animations";

export const SharePopupTrigger = trigger('SharePopupState', [
    state('inactive', style({
        transform: 'translate(0, -50px) scale(0)',
        opacity: '0',
        transformOrigin: 'top right'
    })),
    state('active', style({
        transform: 'translate(0, 0) scale(1)',
        opacity: '1',
    })),
    transition('inactive => active', animate('400ms ease-in')),
    transition('active => inactive', animate('300ms ease-out'))
])