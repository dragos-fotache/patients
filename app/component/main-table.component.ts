import { Component, Input, Output, ChangeDetectionStrategy, ViewChild, EventEmitter } from '@angular/core';

import { DataTable, Column, LazyLoadEvent, Paginator, Header } from 'primeng/primeng';

import { Patient } from '../model/patient.model';


@Component({
    selector: 'main-table',
    directives: [DataTable, Column, Paginator, Header],
    template:`
        <p-dataTable #ref
            responsive="true"
            [value]="patients"
            selectionMode="single"
            [lazy]="true"
            (onLazyLoad)="loadLazy($event)"
            (onRowSelect)="onRowSelect($event)"
            (onRowUnselect)="onRowUnselect($event)"
            [rows]="rows">
            <header>Patientenliste</header>
            <p-column field="internalNumber" header="#" [style]="{'width':'3em'}">       </p-column>
            <p-column field="lastName"       header="Name">     </p-column>
            <p-column field="firstName"      header="Vorname">  </p-column>
            <p-column field="street"         header="Strasse">  </p-column>
            <p-column field="zipnr"          header="PLZ" [style]="{'width':'5em'}">      </p-column>
            <p-column field="city"           header="Ort">      </p-column>
            <p-column field="dateOfBirth"    header="Geb.Datum" [style]="{'width':'7em'}"></p-column>
        </p-dataTable>
        <p-paginator #pag 
                     [rows]="rows" 
                     [totalRecords]="count" 
                     [pageLinkSize]="3" 
                     styleClass="ui-paginator-bottom"
                     (onPageChange)="paginate($event)" 
                     [rowsPerPageOptions]="[5,15,20,25]">
        </p-paginator>
    `
})
export class MainTable {
    @Input()
    patients: Patient[];

    @Input()
    count: Number;

    @ViewChild('ref') 
    ref: DataTable;

    @ViewChild('pag') 
    pag: Paginator;

    rows: Number = 15;

    @Output()
    onLazyLoadArticles: EventEmitter<LazyLoadEvent>;

    @Output()
    onRowSelectEvent: EventEmitter<any>;

    selectedPatient: Patient;

    constructor() {
        this.onLazyLoadArticles = new EventEmitter();
        this.onRowSelectEvent = new EventEmitter();
    }

    paginate(event) {
        this.ref.paginate(event);
    }

    loadLazy(event) {
        this.onLazyLoadArticles.emit(event);
    }

    onRowSelect(event) {
        this.onRowSelectEvent.emit(event.data);
    }

    onRowUnselect(event) {
        this.onRowSelectEvent.emit(event.data);
    }

    resetPaginator() {
        this.pag.changePageToFirst();
    }

}