declare var alertify: alertify.IAlertifyStatic;
declare namespace alertify {
    interface INotificationObject {
        delay(wait: number): INotificationObject;
        dismiss(): INotificationObject;
        dismissdismissOthers(): INotificationObject;
        push(content: string | JQuery, wait: number): INotificationObject;
        setContent(content: string | JQuery): INotificationObject
        callback: INotificationDissmissCallback;
        ondismiss: INotificationDissmissCallback;
    }

    interface INotificationDissmissCallback {
        (dissmissed: boolean): boolean;
    }

    interface IAlertifyStatic {
        dismissAll(): void;
        error(message: string | JQuery, wait: number, callback?: INotificationDissmissCallback): INotificationObject;
        success(message: string | JQuery, wait: number, callback?: INotificationDissmissCallback): INotificationObject;
        warning(message: string | JQuery, wait: number, callback?: INotificationDissmissCallback): INotificationObject;
        message(message: string | JQuery, wait: number, callback?: INotificationDissmissCallback): INotificationObject;
        notify(message: string | JQuery, type: string, wait: number, callback?: INotificationDissmissCallback): INotificationObject;

        prompt(title: string | JQuery);
        prompt(title: string | JQuery, value: string);
        prompt(title: string | JQuery, value: string, onok: Function, oncancel: Function);
        prompt(title: string | JQuery, message: string | JQuery, value: string, onok: Function, oncancel: Function);

        
        confirm(message: string | JQuery);
        confirm(message: string | JQuery, onok: Function);
        confirm(message: string | JQuery, onok: Function, oncancel: Function);
        confirm(title: string | JQuery, message: string | JQuery, onok: Function, oncancel: Function);

        alert(message: string | JQuery);
        alert(title: string | JQuery, message: string | JQuery);
        alert(title: string | JQuery, message: string | JQuery, onok: Function);
    }
}