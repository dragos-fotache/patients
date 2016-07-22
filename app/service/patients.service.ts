import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';

import { Patient } from '../model/patient.model';

import { Base64 } from "../util/base64";

@Injectable()
export class PatientsService {

    private path = 'http://192.168.35.107:8081/patients-backend/patients';
    //private path = 'http://localhost:8081/backend/patients';

    private newurl = this.path + '/new';
    private updateurl = this.path + '/update';
    private deleteurl = this.path + '/delete';
    private testurl = this.path + '/test';
    private loginurl = this.path + '/login';
    private logouturl = this.path + '/logout';

    constructor(private http: Http) {
    }

    getPatients() {
        let options = new RequestOptions({ withCredentials: true });

        return this.http.get(this.path, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    extractData(res: Response) {
        let body = res.json();
        console.log(body)
        return body.data || { };
    }

    login(user: String, password: String) {
        let loginString: string = user + ":" + password;
        let authString = "Basic " + new Base64().encode(loginString);

        let headers = new Headers({ 'Authorization': authString });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        return this.http.get(this.loginurl, options)
                        .toPromise()
                        .then(response => response)
                        .catch(response => response);
    }

    logout() {
        let options = new RequestOptions({ withCredentials: true });

        return this.http.get(this.logouturl, options)
                        .toPromise();
    }


    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}