import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {CommonModelInfo} from './model/common.model';
import {createRequestOption} from '@shared/util/request-util';

@Injectable()
export class CommonHttpService {
    commonId: any;//模块的id
    resourceUrl: any; //模块的通用请求地址
    resourceUrl_search: any; //模块的查询请求地址
    resourceUrl_export: any; //模块的导出数据请求地址
    resourceUrl_batch_edit: any; //模块的批量编辑请求地址
    resourceUrl_batch_delete: any; //模块的批量删除请求地址
    constructor(
        private http: HttpClient
    ) {
    }

    query(req?: any): Observable<HttpResponse<CommonModelInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<CommonModelInfo[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    search(req?: any): Observable<HttpResponse<CommonModelInfo[]>> {
        const options = createRequestOption(req);
        // if (req) {
        //     if (req.size) {
        //         options.set('size', req.size);
        //     }
        // }
        return this.http.get<CommonModelInfo[]>(this.resourceUrl_search, {
            params: options,
            observe: 'response'
        });
    }

    export(req?: any): Observable<HttpResponse<CommonModelInfo[]>> {
        const options = createRequestOption(req);
        // if (req) {
        //     if (req.startTime) {
        //         options.set('size', req.startTime);
        //     }
        //     if (req.endTime) {
        //         options.set('size', req.startTime);
        //     }
        //     if (req.year) {
        //         options.set('size', req.year);
        //     }
        //     if (req.month) {
        //         options.set('size', req.month);
        //     }
        // }
        return this.http.get<CommonModelInfo[]>(this.resourceUrl_export, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<CommonModelInfo>> {
        return this.http.get<CommonModelInfo>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(commonModelInfo: CommonModelInfo): Observable<HttpResponse<CommonModelInfo>> {
        return this.http.put<CommonModelInfo>(this.resourceUrl, commonModelInfo, {observe: 'response'});
    }

    create(commonModelInfo: CommonModelInfo): Observable<HttpResponse<CommonModelInfo>> {
        return this.http.post<CommonModelInfo>(this.resourceUrl, commonModelInfo, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    add(commonModelInfo: CommonModelInfo): Observable<HttpResponse<CommonModelInfo>> {
        const options = createRequestOption(commonModelInfo);
        return this.http.put<CommonModelInfo>(this.resourceUrl, commonModelInfo, {
            params: options,
            observe: 'response'
        });
    }

    batch_update(commonModelInfo: CommonModelInfo): Observable<HttpResponse<CommonModelInfo>> {
        const options = createRequestOption(commonModelInfo);
        return this.http.put<CommonModelInfo>(this.resourceUrl_batch_edit, commonModelInfo, {
            params: options,
            observe: 'response'
        });
    }

    batch_delete(list: any): Observable<HttpResponse<CommonModelInfo>> {
        return this.http.delete(`${this.resourceUrl_batch_delete}?list=${list}`, {observe: 'response'});
    }
}
