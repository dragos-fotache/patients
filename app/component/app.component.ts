import { LazyLoadEvent, Button, Dialog, Dropdown, SelectItem, RadioButton, Checkbox, Calendar, Panel } from 'primeng/primeng';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { Patient } from '../model/patient.model';
import { Insurance } from '../model/insurance.model';
import { Zip } from '../model/zip.model';
import { LButtonComponent } from '../component/l-button.component';
import { MainTable } from '../component/main-table.component';
import { InsuranceTable } from '../component/insurance-table.component';
import { ZipTable } from '../component/zip-table.component';
import { PatientsService } from '../service/patients.service';


@Component({
    selector: 'my-app',
    providers: [ PatientsService ],
    directives: [ MainTable, Button, LButtonComponent, Dialog, Dropdown, RadioButton, InsuranceTable, Checkbox, Calendar, Panel, ZipTable, REACTIVE_FORM_DIRECTIVES ],
    template: `
        <div class="container main" style="overflow: hidden; position: relative">
            <div class="ui-widget-header" style="position:absolute; right: 0px; width: 260px; height: 100%; border-style: solid;">
                <div>Menu</div>
                <div style="margin-left: 3px; margin-top: 15px">
                        <l-button [icon]="'fa-file-o'" [label]="'New'" (click)="showNewPatientDialog()"></l-button>
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
                            <div class="ui-g-4" [class.ui-widget-header]="selectedPatient">
                                {{ selectedPatient ? selectedPatient.firstName + ", " + selectedPatient.lastName : "" }}
                            </div>
                            <div class="ui-g-5"></div>
                        </div>
                        <div class="ui-g">
                            <div class="ui-g-4">{{ selectedPatient ? selectedPatient.street : ""}}</div>
                            <div class="ui-g-5">{{ selectedPatient ? "Tel.-nr.: " + (selectedPatient.homePhone ? selectedPatient.homePhone : "") : ""}}</div>
                        </div>
                        <div class="ui-g">
                            <div class="ui-g-4">{{ selectedPatient ? (selectedPatient.zipnr ? selectedPatient.zipnr : "") + " " + (selectedPatient.city ? selectedPatient.city : "") : ""}}</div>
                            <div class="ui-g-5">{{ selectedPatient ? "Patientart: " + (selectedPatient.patientTypeLong ? selectedPatient.patientTypeLong : ""): ""}}</div>
                        </div>
                        <div class="ui-g">
                            <div class="ui-g-4">{{ selectedPatient ? "Geb.-Datum: " + selectedPatient.dateOfBirth : ""}}</div>
                            <div class="ui-g-5">{{ selectedPatient ? (selectedPatient.insurance ? selectedPatient.insurance.healthInsuranceName : ""): ""}}</div>
                        </div>
                    </div>
                </div>
                <main-table #tab
                    [patients]="patients"
                    [count]="count"
                    (onLazyLoad)="lazyLoadPatients($event)"
                    (onRowSelectEvent)="setSelectedPatient($event)">
                </main-table>
                <div class="ui-widget ui-widget-header" style="padding: 10px 10px">
                    <div class="ui-g">
                        <div class="ui-g-9">
                            <form (ngSubmit)="onClickSearch()" style="margin-bottom: 0em;">
                                Search:
                                <input type="text" pInputText name="searchTextModel" [(ngModel)]="searchTextModel"/>
                                <button pButton type="submit" label="Search"></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <p-dialog header="Kassen" [width]="'850'" [height]="'620'" [(visible)]="displayKasseDialog" [resizeable]="false" showEffect="fade" [modal]="true">
                <div>
                    <div style="height: 480px">
                        <insurance-table
                            #insuranceTable
                            [insurances]="insurances"
                            (onLazyLoad)="lazyLoadInsurances($event)"
                            [count]="insuranceCount"
                            (onRowSelect)="setSelectedInsurance($event)">
                        >
                        </insurance-table>
                        <div class="ui-widget ui-widget-header">
                            <div class="ui-g">
                                <div class="ui-g-9">
                                    <form (ngSubmit)="onClickSearchInsurance()" style="margin-bottom: 0em;">
                                        Search:
                                        <input type="text" pInputText  name="searchFieldKasse" [(ngModel)]="searchTextInsuranceModel"/>
                                        <button pButton type="submit" label="Search"></button>
                                    </form>
                                </div>
                                <div class="ui-g-3" style="margin-top:0.5em">
                                    <span>{{insuranceCount}} records found.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <footer>
                            <button pButton label="OK" (click)="insuranceOKClick()"></button>
                            <button type="button" pButton label="Cancel" (click)="insuranceCancelClick()"></button>
                        </footer>
                    </div>
                </div>
            </p-dialog>
            <p-dialog header="Zips" [width]="'400'" [height]="'600'" [(visible)]="displayZipDialog" [resizeable]="false" showEffect="fade" [modal]="true">
                <div>
                    <div style="height: 460px">
                        <zip-table
                            #zipTable
                            [zips]="zips"
                            (onLazyLoad)="lazyLoadZips($event)"
                            [count]="zipCount"
                            (onRowSelect)="setSelectedZip($event)"
                        >
                        </zip-table>
                        <div class="ui-widget ui-widget-header">
                            <div class="ui-g">
                                <div class="ui-g-9">
                                    <form (ngSubmit)="onClickSearchZip()" style="margin-bottom: 0em;">
                                        Search:
                                        <input type="text" pInputText name="searchFieldZip" [(ngModel)]="searchTextZipModel"/>
                                        <button pButton type="submit" label="Search" style="margin-top:1em"></button>
                                    </form>
                                </div>
                                <div class="ui-g-3" style="margin-top:0.5em">
                                    <span>{{zipCount}} records found.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <footer>
                            <button pButton label="OK" (click)="zipOKClick()"></button>
                            <button type="button" pButton label="Cancel" (click)="zipCancelClick()"></button>
                        </footer>
                    </div>
                </div>
            </p-dialog>
        </div>

        <p-dialog header="Neuanlage Patient" [width]="'870'" [height]="'550'" [(visible)]="displayNewPatientDialog" [resizeable]="false" showEffect="fade" [modal]="true">
                <form style="box-sizing: border-box;font-size:16px; height:400px" (ngSubmit)="newPatientSubmit()" #spy>
                    <div *ngIf="patient">
                        <div style="height:2em; margin-bottom:0.5em">
                            <div style="width:15%; float:left" class="vcenter"><span>Geschlecht:</span></div>
                            <div style="width:25%; float:left" class="vcenter">
                                <input type="radio" name="sex" value="M" [(ngModel)]="patient.sex"/>
                                M
                                <input type="radio" name="sex" value="W" [(ngModel)]="patient.sex"/>
                                W
                                <input type="radio" name="sex" value="unbekannt" checked [(ngModel)]="patient.sex"/>
                                Unbekannt
                            </div>
                            <div style="width:17%; float:left" class="vcenter">
                                Kasse:
                            </div>
                            <div style="width:40%; float:left">
                                <input 
                                    style="width:70%" 
                                    pInputText 
                                    disabled
                                    name="kasse" 
                                    [(ngModel)]="patient.healthInsuranceName"
                                />
                                <button type='button' pButton icon="fa-search" (click)="showKasseDialog()"></button>
                            </div>
                        </div>
                        <div style="height:2em; margin-bottom:0.5em">
                            <div style="width:15%; float:left" class="vcenter">Anrede:</div>
                            <div style="width:25%; float:left">
                                <p-dropdown [options]="politeAddresses" name="politeAddresses" [(ngModel)]="patient.politeAddress"></p-dropdown>
                            </div>
                            <div style="width:17%; float:left" class="vcenter">
                                IK-Nr.:
                            </div>
                            <div style="width:40%; float:left">
                                <input style="width:70%" pInputText disabled id="iknr" name="iknr" [ngModel]="patient.insurance ? patient.insurance.iknumber : ''" />
                                <button type='button' pButton icon="fa-search" (click)="showKasseDialog()"></button>
                            </div>
                        </div>
                        <div style="height:2em; margin-bottom:0.5em">
                            <div style="width:15%; float:left" class="vcenter">Zusatz/Titel:</div>
                            <div style="width:13%; float:left">
                                <p-dropdown [style]="{'width': '65%'}" [options]="lastNamePrefixes" name="lastNamePrefixes" [(ngModel)]="patient.lastNamePrefix"></p-dropdown>
                            </div>
                            <div style="width:12%; float:left">
                                <p-dropdown [style]="{'width': '50%'}" [options]="titles" name="title" [(ngModel)]="patient.title"></p-dropdown>
                            </div>
                            <div style="width:17%; float:left" class="vcenter">
                                Vers-Nr.:
                            </div>
                            <div style="width:40%; float:left">
                                <input style="width:70%" pInputText id="versnr"/>
                            </div>
                        </div>
                        <div style="height:2em; margin-bottom:0.5em">
                            <div style="width:15%; float:left" class="vcenter"><label for="lastName">Name: </label></div>
                            <div style="width:25%; float:left">
                                <input 
                                    style="width:90%" 
                                    pInputText 
                                    name="lastName"
                                    class="form-control" 
                                    required
                                    [(ngModel)]="patient.lastName"
                                />
                            </div>
                            <div style="width:17%; float:left" class="vcenter">Status/Ergänzung:</div>
                            <div style="width:25%; float:left"><input style="width:90%" id="status" name="status" [(ngModel)]="patient.status"/></div>
                            <div style="width:15%; float:left"><input style="width:90%" id="ergaenzung" name="ergaenzung" [(ngModel)]="patient.ergaenzung"/></div>
                        </div>
                        <div style="height:2em; margin-bottom:0.5em">
                            <div style="width:15%; float:left" class="vcenter"><label for="firstName">Vorname: </label></div>
                            <div style="width:25%; float:left">
                                <input 
                                    style="width:90%" 
                                    pInputText 
                                    name="firstName"
                                    class="form-control" 
                                    required
                                    [(ngModel)]="patient.firstName"
                                />
                            </div>
                            <div style="width:17%; float:left" class="vcenter"><label for="Status">Karte gültig:</label></div>
                            <div style="width:9%; float:left"><input style="width:90%" id="kartegueltigmm"/></div>
                            <div style="width:4%; float:left" class="vcenter"><label>MM</label></div>
                            <div style="width:9%; float:left"><input style="width:90%" id="kartegueltigjj"/></div>
                            <div style="width:3%; float:left" class="vcenter"><label>JJ</label></div>
                        </div>
                        <div style="height:2em; margin-bottom:0.5em">
                            <div style="width:15%; float:left" class="vcenter"><label for="gebdatum">Geb.-Datum:</label></div>
                            <div style="width:25%; float:left">
                                <p-calendar 
                                    [inputStyle]="{'width':'70%'}" 
                                    showAnim="slideDown" 
                                    showIcon="true"
                                    dateFormat="dd/mm/yy"
                                    [yearNavigator]="true"
                                    name="gebdatum" 
                                    [(ngModel)]="patient.dateOfBirthString" 
                                >
                                </p-calendar>
                            </div>
                            <div style="width:17%; float:left" class="vcenter"><label for="zuzahlung">Zuzahlung:</label></div>
                            <div style="width:25%; float:left">
                                <p-dropdown [options]="surchargeStatuses" name="surchargeStatus" [(ngModel)]="patient.surchargeStatus"></p-dropdown>
                            </div>
                        </div>
                        <div style="height:2em; margin-bottom:0.5em">
                            <div style="width:15%; float:left" class="vcenter">Strasse:</div>
                            <div style="width:25%; float:left"><input style="width:90%" pInputText id="strasse" name="strasse" [(ngModel)]="patient.street" /></div>
                            <div style="width:17%; float:left" class="vcenter">
                                <label for="homepatient">Heimpatient:</label>
                            </div>
                            <div style="width:5%; float:left">
                                <p-checkbox name="homepatient" [(ngModel)]="patient.homepatient" (onChange)="homepatientChkboxChange"></p-checkbox>
                            </div>
                            <div style="width:15%; float:left" class="vcenter">Entfernung:</div>
                            <div style="width:5%; float:left"><input style="width:70%" pInputText id="distance" name="distance" [(ngModel)]="patient.distance" /></div>
                            <div style="width:5%; float:left" class="vcenter">km</div>
                        </div>
                        <div style="height:2em; margin-bottom:0.5em">
                            <div style="width:15%; float:left" class="vcenter">PLZ/Ort:</div>
                            <div style="width:8%; float:left">
                                <input 
                                    style="width:90%" 
                                    pInputText 
                                    name="plz" 
                                    [(ngModel)]="patient.zipnr" 
                                />
                            </div>
                            <div style="width:6%; float:left">
                                <button type='button' pButton icon="fa-search" (click)="showZipDialog()"></button>
                            </div>
                            <div style="width:11%; float:left">
                                <input 
                                    style="width:80%" 
                                    pInputText 
                                    name="city" 
                                    [(ngModel)]="patient.city" 
                                />
                            </div>
                            <div style="width:17%; float:left" class="vcenter">Behandlung:</div>
                            <div style="width:25%; float:left">
                                <p-dropdown [options]="handlingTypes" name="handlingType" [(ngModel)]="patient.handlingType"></p-dropdown>
                            </div>
                        </div>
                        <div style="height:2em; margin-bottom:0.5em">
                            <div style="width:15%; float:left" class="vcenter">Tel-Nr privat:</div>
                            <div style="width:25%; float:left">
                                <input style="width:90%" pInputText id="homePhone" name="homePhone" [(ngModel)]="patient.homePhone"/>
                            </div>
                        </div>
                        <div style="height:2em; margin-bottom:0.5em">
                            <div style="width:15%; float:left" class="vcenter">Mobil-Nr:</div>
                            <div style="width:25%; float:left">
                                <input style="width:90%" pInputText id="mobilePhone" name="mobilePhone" [(ngModel)]="patient.mobilePhone"/>
                            </div>
                        </div>
                    </div>
                    <div style="float: right; margin-right:2em">
                        <footer>
                            <button pButton type="submit" label="OK"></button>
                            <button type="button" pButton label="Cancel" (click)="newPatientCancelClick()"></button>
                        </footer>
                    </div>
                </form>
            </p-dialog>
    `
})
export class AppComponent implements OnInit { 

    @ViewChild('spy')
    form: Form;

    @ViewChild('tab') 
    tab: MainTable;

    @ViewChild('insuranceTable') 
    insuranceTable: InsuranceTable;

    @ViewChild('zipTable') 
    zipTable: ZipTable;

    patients : Patient[];
    insurances: Insurance[];
    zips: Zip[];

    count : Number;
    insuranceCount: Number;
    zipCount: Number;

    searchText : String = "";
    searchTextModel: String = "";
    searchTextInsurance : String = "";
    searchTextInsuranceModel: String = "";
    searchTextZip : String = "";
    searchTextZipModel: String = "";

    selectedPatient: Patient;
    selectedInsurance: Insurance;
    selectedZip: Zip;

    displayNewPatientDialog: Boolean = false;
    displayKasseDialog: Boolean = false;
    displayZipDialog: Boolean = false;

    patient: Patient = new Patient();
    isNewPatient: Boolean = false

    surchargeStatuses : SelectItem[] = [{label: "Pflichtig", value: "PFLICHTIG"}, {label: "Frei", value: "FREI"}];
    politeAddresses : SelectItem[] = [{label: "None", value: ""}, {label: "Frau", value: "FRAU"}, {label: "Herr", value: "HERR"}];
    lastNamePrefixes : SelectItem[] = [{label: "None", value: ""}, {label: "Baroness", value: "BARONESS"}, {label: "Grafin", value: "GRAFIN"}];
    titles : SelectItem[] = [{label: "None", value: ""}, {label: "Prof", value: "PROF"}, {label: "Dr", value: "DR"}];
    handlingTypes: SelectItem[] = [{label: "Praxis", value: "PRAXIS"}, {label: "Hausbesuch", value: "HAUSBESUCH"}];
    selectedSurcharge : String;

    constructor (private patientsService: PatientsService) {
    }

    ngOnInit() {
    }

    lazyLoadPatients(event: LazyLoadEvent) {
        this.selectedPatient = null;
        this.patientsService.getPatientsSlice(event.first, event.rows, event.sortField, event.sortOrder, this.searchText)
                        .then(slice => {
                                    this.patients = slice.patients;
                                    this.count = slice.count;
                                });
    }

    lazyLoadInsurances(event: LazyLoadEvent) {
        this.patientsService.getInsurancesSlice(event.first, event.rows, event.sortField, event.sortOrder, this.searchTextInsurance)
                        .then(slice => {
                                    this.insurances = slice.insurances;
                                    this.insuranceCount = slice.count;
                                });
    }

    lazyLoadZips(event: LazyLoadEvent) {
        this.patientsService.getZipsSlice(event.first, event.rows, event.sortField, event.sortOrder, this.searchTextZip)
                        .then(slice => {
                                    this.zips = slice.zips;
                                    this.zipCount = slice.count;
                                });
    }

    setSelectedPatient(patient) {
        if (this.selectedPatient == patient)
            this.selectedPatient = null;
        else
            this.selectedPatient = patient;
    }

    setSelectedInsurance(insurance) {
        if (this.selectedInsurance == insurance)
            this.selectedInsurance = null;
        else
            this.selectedInsurance = insurance;
    }

    setSelectedZip(zip) {
        if (this.selectedZip == zip)
            this.selectedZip = null;
        else
            this.selectedZip = zip;
    }

    onClickSearch() {
        this.searchText = this.searchTextModel;
        this.tab.resetPaginator();
    }

    onClickSearchInsurance() {
        this.searchTextInsurance = this.searchTextInsuranceModel;
        this.insuranceTable.resetPaginator();
    }

    onClickSearchZip() {
        this.searchTextZip = this.searchTextZipModel;
        this.zipTable.resetPaginator();
    }

    showNewPatientDialog() {
        this.isNewPatient = true;
        this.patient = new Patient();
        this.displayNewPatientDialog = true;
    }

    showKasseDialog() {
        this.displayKasseDialog = true;
    }

    showZipDialog() {
        this.displayZipDialog = true;
    }

    insuranceOKClick() {
        this.patient.insurance = this.selectedInsurance;
        this.patient.healthInsuranceName = this.selectedInsurance.healthInsuranceName;
        this.displayKasseDialog = false;
    }

    insuranceCancelClick() {
        this.displayKasseDialog = false;
    }

    zipOKClick() {
        this.patient.zip = this.selectedZip;
        this.patient.zipnr = this.selectedZip.zip;
        this.patient.city = this.selectedZip.city;
        this.displayZipDialog = false;
    }

    zipCancelClick() {
        this.displayZipDialog = false;
    }

    newPatientSubmit() {
        this.patientsService.createPatient(this.patient).then(e => console.log("patient created"));
        this.displayNewPatientDialog = false;
        this.tab.resetPaginator();
    }

    newPatientCancelClick() {
        this.displayNewPatientDialog = false;
    }

    homepatientChkboxChange(checked: boolean) {
        console.log("homepatientChkboxChange");
        this.patient.homepatient = checked ? 'true' : 'false';
        return false;
    }

}
