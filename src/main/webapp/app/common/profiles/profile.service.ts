import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {SERVER_API_URL} from '../../app.constants';
import {ProfileInfo} from './profile-info.model';

@Injectable()
export class ProfileService {
    private profileInfoUrl = SERVER_API_URL + 'api/profile-info';
    private profileInfo: Promise<ProfileInfo>;

    constructor(private http: HttpClient) {
    }
}
