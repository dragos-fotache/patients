import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';

import { Patient } from '../model/patient.model';
import { SliceData } from './slice-data';

import { Base64 } from "../util/base64";

@Injectable()
export class PatientsService {

    // private path = 'http://192.168.35.107:8081/patients-backend/patients';
    private path = 'http://localhost:8001/patients-backend/patients';
    private insurancesPath = 'http://localhost:8001/patients-backend/insurances';
    private zipsPath = 'http://localhost:8001/patients-backend/zips';
    private createPatientPath = 'http://localhost:8001/patients-backend/patients/create';

    private newurl = this.path + '/new';
    private updateurl = this.path + '/update';
    private deleteurl = this.path + '/delete';
    private testurl = this.path + '/test';
    private loginurl = this.path + '/login';
    private logouturl = this.path + '/logout';

    constructor(private http: Http) {
    }

    getPatientsSlice(first: Number, rows: Number, sortField: String, sortOrder: Number, searchStringParam: String) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        let lazyLoadData = { 'first': first, 'rows': rows, 'sortField': sortField, 'sortOrder': sortOrder, 'searchStringParam': searchStringParam }

        return this.http.post(this.path, lazyLoadData, options)
            .toPromise()
            .then(this.extractPatientsSliceData)
            .catch(this.handleError);
    }

    getInsurancesSlice(first: Number, rows: Number, sortField: String, sortOrder: Number, searchStringParam: String) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        let lazyLoadData = { 'first': first, 'rows': rows, 'sortField': sortField, 'sortOrder': sortOrder, 'searchStringParam': searchStringParam }

        return this.http.post(this.insurancesPath, lazyLoadData, options)
            .toPromise()
            .then(this.extractInsurancesSliceData)
            .catch(this.handleError);
    }

    getZipsSlice(first: Number, rows: Number, sortField: String, sortOrder: Number, searchStringParam: String) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        let lazyLoadData = { 'first': first, 'rows': rows, 'sortField': sortField, 'sortOrder': sortOrder, 'searchStringParam': searchStringParam }

        return this.http.post(this.zipsPath, lazyLoadData, options)
            .toPromise()
            .then(this.extractZipsSliceData)
            .catch(this.handleError);
    }

    createPatient(p: Patient) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        console.log(p);

        return this.http.post(this.createPatientPath, p, options)
            .toPromise()
            .then()
            .catch();
    }

    extractPatientsSliceData(res: Response) {
        let body = res.json();

        body.patients.forEach(e => {

            if (e.dateOfBirth !== null) {
                let d: Date = new Date(e.dateOfBirth);
                e.dateOfBirth = d.toLocaleDateString("fr-BE");
            }

            if (e.zip) e.zipnr = e.zip.zip;
            if (e.patientType == "KASSE") {
                e.patientTypeLong = "Kassenpatient";
            } else if (e.patientType == "PRIVAT") {
                e.patientTypeLong = "Privatpatient";
            }
        });

        return body;
    }

    extractInsurancesSliceData(res: Response) {
        let body = res.json();

        body.insurances.forEach(e => {
            e.plz = (e.zip ? e.zip.zip : "");
            e.ort = (e.zip ? e.zip.city : "");
        });

        return body;
    }

    extractZipsSliceData(res: Response) {
        let body = res.json();
        console.log(body);
        return body;
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