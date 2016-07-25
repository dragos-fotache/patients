import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { DataTable, Column, LazyLoadEvent, Header, Paginator } from 'primeng/primeng';

import { Insurance } from '../model/insurance.model';

@Component({
    selector: 'insurance-table',
    directives: [DataTable, Column, Header, Paginator],
    template:`
        <p-dataTable #ref
                [value]="insurances"
                selectionMode="single"
                scrollable="true"
                scrollHeight="400px"
                [rows]="rows" 
                [lazy]="true"
                (onLazyLoad)="loadLazy($event)"
                (onRowSelect)="rowSelect($event)"
                (onRowUnselect)="rowUnselect($event)"
        >

            <p-column field="iknumber" header="IK-Nr"></p-column>
            <p-column field="healthInsuranceName" header="Krankenkasse"></p-column>
            <p-column field="street" header="Strasse"></p-column>
            <p-column field="plz" header="PLZ"></p-column>
            <p-column field="ort" header="Ort"></p-column>

        </p-dataTable>
        <p-paginator #pag 
                     [rows]="rows" 
                     [totalRecords]="count" 
                     [pageLinkSize]="3" 
                     styleClass="ui-paginator-bottom"
                     (onPageChange)="paginate($event)" 
        >
        </p-paginator>
    `
})
export class InsuranceTable {

    @ViewChild('ref') 
    ref: DataTable;

    @ViewChild('pag') 
    pag: Paginator;

    @Input()
    insurances: Insurance[];

    @Input()
    count: Number;

    @Output()
    onLazyLoad: EventEmitter<any>;

    @Output()
    onRowSelect: EventEmitter<any>;

    rows: Number = 20;

    constructor() {
        this.onLazyLoad = new EventEmitter<any>();
        this.onRowSelect = new EventEmitter();
    }

    loadLazy(event) {
        this.onLazyLoad.emit(event);
    }

    rowSelect(event) {
        this.onRowSelect.emit(event.data);
    }

    rowUnselect(event) {
        this.onRowSelect.emit(event.data);
    }

    resetPaginator() {
        this.pag.changePageToFirst();
    }

    paginate(event) {
        this.ref.paginate(event);
    }

}