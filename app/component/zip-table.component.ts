import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { DataTable, Column, LazyLoadEvent, Header, Paginator } from 'primeng/primeng';

import { Zip } from '../model/zip.model';

@Component({
    selector: 'zip-table',
    directives: [DataTable, Column, Header, Paginator],
    template:`
        <p-dataTable #ref
                [value]="zips"
                selectionMode="single"
                scrollable="true"
                scrollHeight="300px"
                [rows]="rows" 
                [lazy]="true"
                (onLazyLoad)="loadLazy($event)"
                (onRowSelect)="rowSelect($event)"
                (onRowUnselect)="rowUnselect($event)"
        >

            <p-column field="zip" header="PLZ"></p-column>
            <p-column field="city" header="Ort"></p-column>

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
export class ZipTable {

    @ViewChild('ref') 
    ref: DataTable;

    @ViewChild('pag') 
    pag: Paginator;

    @Input()
    zips: Zip[];

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