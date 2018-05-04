namespace Core {
    export interface IHttpServicePromise<T> {
        promise: ng.IHttpPromise<T>;
        cancel();
    }
}