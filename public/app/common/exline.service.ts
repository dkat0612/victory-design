import {HttpServicePromise, HttpService, NAME as HttpService_NAME} from './http.service';

export interface IRegion {
    id: number;
    title: string;
    cached_path: string;
    zone?: string;
    origin?: boolean;
    destination?: boolean;
}
export interface IGetPlaceResult {
    regions: IRegion[];
    meta: {
        total: number;
    }
}

export interface IGetPriceRequest {
    origin_id: number;
    destination_id: number;
    weight: number;
    service?: string;
    package_weight?: number;
}

export interface ICalculation {
    price: number;
    fuel_surplus: number;
    min: number;
    max: number;
    human_range: number;
}

export interface ICalculations {
    standard: ICalculation;
    express: ICalculation;
    [key: string]: ICalculation;
}

export interface IGetPriceResponse {
    calculations: ICalculations;
}

export const NAME: string = 'vcExlineService';

export class ExlineService {
    constructor(private $http: HttpService, private $q: ng.IQService) { }

    public getOriginPlace(keyword: string): HttpServicePromise<IGetPlaceResult>{
        let promise = this.$http.get('https://api.exline.systems/public/v1/regions/origin', {
            params: {
                title: keyword
            }
        });
        return promise;
    }

    public getDestinationPlace(keyword: string): HttpServicePromise<IGetPlaceResult> {
        let promise = this.$http.get('https://api.exline.systems/public/v1/regions/destination', {
            params: {
                title: keyword
            }
        });
        return promise;
    }

    public getPrice(model: IGetPriceRequest): HttpServicePromise<IGetPriceResponse> {

        let model2 = angular.copy(model);
        model2.service = 'standard';
        let promise2 = this.$http.get('https://api.exline.systems/public/v1/calculate', {
            params: model2
        }); 

        model.service = 'express';
        if (model.package_weight) model.weight = model.package_weight;
        let promise = this.$http.get('https://api.exline.systems/public/v1/calculate', {
            params: model
        });

        let result = new HttpServicePromise<IGetPriceResponse>(this.$q.all([promise.promise, promise2.promise]).then(r => {
            let res = {
                calculations: {
                    express: (<any>r[0].data).calculation,
                    standard: (<any>r[1].data).calculation
                }
            }
            return <any>{data: res};
        }), this.$q.defer());

        return result;
    }
}

ExlineService.$inject = [HttpService_NAME, '$q'];

export default {
    name: NAME,
    service: ExlineService
}