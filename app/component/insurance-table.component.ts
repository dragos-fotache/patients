import { Component, Input, Output, EventEmitter } from '@angular/core';

import { DataTable, Column, LazyLoadEvent, Header } from 'primeng/primeng';

import { Insurance } from '../model/insurance.model';

@Component({
    selector: 'insurance-table',
    directives: [DataTable, Column, Header],
    template:`
        <p-dataTable #ref
                [value]="insurances"
                selectionMode="single"
                scrollable="true"
                scrollHeight="400px">

            <p-column field="iknumber" header="IK-Nr"></p-column>
            <p-column field="healthInsuranceName" header="Krankenkasse"></p-column>
            <p-column field="street" header="Strasse"></p-column>
            <p-column field="plz" header="PLZ"></p-column>
            <p-column field="ort" header="Ort"></p-column>

        </p-dataTable>
    `
})
export class InsuranceTable {
    @Input()
    insurances: Insurance[];
}