export class HttpServicePromise<T> implements Core.IHttpServicePromise<T> {
    constructor(public promise: ng.IHttpPromise<T>, private canceler: ng.IDeferred<boolean>) { }

    public cancel() {
        this.canceler.resolve(true);
    }
}

export class HttpService {

    constructor(private $http: ng.IHttpService, private $q: ng.IQService) { }

    public get<T>(url: string, config?: ng.IRequestShortcutConfig): HttpServicePromise<T> {
        let defered = this.$q.defer<boolean>();
        if (config.timeout == undefined) {
            config.timeout = defered.promise;
        }
        let promise = this.$http.get<T>(url, config);
        let response = new HttpServicePromise(promise, defered);
        return response;
    }
}

HttpService.$inject = ['$http', '$q'];

export const NAME: string = 'vcHttpService';

export default {
    name: NAME,
    service: HttpService
}