import { Component, OnInit, ViewChild } from '@angular/core';

import { Patient } from '../model/patient.model';
import { MainTable } from '../component/main-table.component';
import { LButtonComponent } from '../component/l-button.component';
import { PatientsService } from '../service/patients.service';

import { LazyLoadEvent, Button, Dialog, Dropdown, SelectItem } from 'primeng/primeng';

@Component({
    selector: 'my-app',
    providers: [ PatientsService ],
    directives: [ MainTable, Button, LButtonComponent, Dialog, Dropdown ],
    template: `
        <div class="container main" style="overflow: hidden; position: relative">
            <div class="ui-widget-header" style="position:absolute; right: 0px; width: 260px; height: 100%; border-style: solid;">
                <div>Menu</div>
                <div style="margin-left: 3px; margin-top: 15px">
                        <l-button [icon]="'fa-file-o'" [label]="'New'" (click)="showNewDialog()"></l-button>
                        <l-button [icon]="'fa-edit'" [label]="'Edit'" [inverted]="true"></l-button>
                </div>
            </div>
            <div style="margin-right: 262px">
                <div style="height:10em">
                    <div class="ui-widget-header" style="float:left; position:relative; height:99%; width:1em; border-style:solid; border-radius:5px 0px 0px 5px">
                        <p style="position:relative; top:3.8em; transform: rotate(270deg)">Info</p>
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
            <p-dialog header="Neuanlage Patient" [width]="'800'" [height]="'400'" [(visible)]="displayDialog" [resizeable]="false" showEffect="fade" [modal]="true">
                <div style="box-sizing: border-box;font-size:14px">
                    <div *ngIf="patient" style="height:400px">
                        <div style="height:2em">
                            <div style="width:10%; float:left"><label for="Name">Name: </label></div>
                            <div style="width:25%; float:left"><input style="width:90%" pInputText id="Name" [(ngModel)]="patient.name" /></div>
                            <div style="width:17%; float:left"><label for="Status">Status/Ergänzung:</label></div>
                            <div style="width:25%; float:left"><input style="width:90%" pInputText id="Status" [(ngModel)]="patient.name" /></div>
                            <div style="width:22%; float:left"><input style="width:90%" pInputText id="Ergaenzung" [(ngModel)]="patient.name" /></div>
                        </div>
                        <div style="height:2em">
                            <div style="width:10%; float:left"><label for="Vorname">Vorname: </label></div>
                            <div style="width:25%; float:left"><input style="width:90%" pInputText id="Vorname" [(ngModel)]="patient.vorname" /></div>
                            <div style="width:17%; float:left"><label for="Status">Karte gültig:</label></div>
                            <div style="width:9%; float:left"><input style="width:90%" pInputText id="Status" [(ngModel)]="patient.name" /></div>
                            <div style="width:4%; float:left"><label>MM</label></div>
                            <div style="width:9%; float:left"><input style="width:90%" pInputText id="Status" [(ngModel)]="patient.name" /></div>
                            <div style="width:3%; float:left"><label>JJ</label></div>
                        </div>
                        <div tyle="height:2em">
                            <div style="width:10%; float:left"><label for="gebdatum">Geb.-Datum:</label></div>
                            <div style="width:25%; float:left"><input style="width:90%" pInputText id="gebdatum" [(ngModel)]="patient.dateOfBirth" /></div>
                            <div style="width:17%; float:left"><label for="zuzahlung">Zuzahlung:</label></div>
                            <div style="width:25%; float:left"><p-dropdown [style]="{width:'90%'}" [options]="surchargeStatuses" [(ngModel)]="selectedSurcharge"></p-dropdown></div>
                        </div>
                    </div>
                </div>
            </p-dialog>
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

    displayDialog: Boolean = true;
    patient: Patient = new Patient();
    isNewPatient: Boolean = false

    surchargeStatuses : SelectItem[] = [{label: "Pflichtig", value: "PFLICHTIG"}, {label: "Frei", value: "FREI"}];
    selectedSurcharge : String;

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

    showNewDialog() {
        this.isNewPatient = true;
        this.patient = new Patient();
        this.displayDialog = true;
    }

}
