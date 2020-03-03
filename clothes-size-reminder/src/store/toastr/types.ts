export interface ToastrState {
    isShown: boolean;
    messages: ToastrMessage[];
}

export interface ToastrMessage {
    message: string;
    priority: ToastrPriority;
}

export enum ToastrPriority {
    Info = 'info',
    Warning = 'warning',
    Error = 'error',
}

export const TOTO = 'TOTO';
