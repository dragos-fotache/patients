import { Component, OnInit, ViewChild } from '@angular/core';

import { Patient } from '../model/patient.model';
import { MainTable } from '../component/main-table.component';
import { PatientsService } from '../service/patients.service';

import { LazyLoadEvent, Button } from 'primeng/primeng';

@Component({
    selector: 'my-app',
    providers: [ PatientsService ],
    directives: [ MainTable, Button ],
    template: `
        <div class="container main">
            <div style="height:10em">
                <div class="ui-widget-header" style="float:left; position:relative; height:99%; width:1em; border-style:solid; border-radius:5px 0px 0px 5px">
                    <p style="position:relative; top:3.5em; transform: rotate(270deg)">Info</p>
                </div>
                <div class="ui-widget ui-widget-content info" style="margin-left:1em">
                    <div class="ui-g">
                        <div class="ui-g-3" [class.ui-widget-header]="selectedPatient">
                            {{ selectedPatient ? selectedPatient.firstName + ", " + selectedPatient.lastName : "" }}
                        </div>
                        <div class="ui-g-3"></div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-3">{{ selectedPatient ? selectedPatient.street : ""}}</div>
                        <div class="ui-g-3">{{ selectedPatient ? "Tel.-nr.: " + selectedPatient.homePhone : ""}}</div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-3">{{ selectedPatient ? selectedPatient.zipnr + " " + selectedPatient.city : ""}}</div>
                        <div class="ui-g-3">{{ selectedPatient ? "Patientart: " + selectedPatient.patientTypeLong: ""}}</div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-3">{{ selectedPatient ? "Geb.-Datum: " + selectedPatient.dateOfBirth : ""}}</div>
                        <div class="ui-g-3">{{ selectedPatient ? selectedPatient.insurance.healthInsuranceName: ""}}</div>
                    </div>
                </div>
            </div>
            <main-table #tab
                [patients]="patients"
                [count]="count"
                (onLazyLoadArticles)="lazyLoadArticles($event)"
                (onRowSelectEvent)="setSelectedPatient($event)">
            </main-table>
            <div class="ui-widget ui-widget-header" style="padding: 10px 10px">
                <div class="ui-g">
                    <div class="ui-g-9">
                        <form (ngSubmit)="onClickSearch()" style="margin-bottom: 0em;">
                            <label for="searchField">Search:  </label>
                            <input type="text" pInputText id="searchField" name="searchTextModel" [(ngModel)]="searchTextModel"/>
                            <button pButton type="submit" label="Search"></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class AppComponent implements OnInit { 

    @ViewChild('tab') 
    tab: MainTable;

    patients : Array<Patient>;

    count : Number;

    searchText : String = "";
    searchTextModel: String = "";

    selectedPatient: Patient;

    constructor (private patientsService: PatientsService) {
    }

    ngOnInit() {
    }

    lazyLoadArticles(event: LazyLoadEvent) {
        this.selectedPatient = null;
        this.patientsService.getPatientsSlice(event.first, event.rows, event.sortField, event.sortOrder, this.searchText)
                        .then(slice => {
                                    this.patients = slice.patients;
                                    this.count = slice.count;
                                });
    }

    setSelectedPatient(patient) {
        if (this.selectedPatient == patient)
            this.selectedPatient = null;
        else
            this.selectedPatient = patient;
    }

    onClickSearch() {
        this.searchText = this.searchTextModel;
        this.tab.resetPaginator();
        return false;
    }

}
