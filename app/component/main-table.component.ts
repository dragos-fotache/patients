import { Component, Input } from '@angular/core';

import { DataTable, Column } from 'primeng/primeng';

import { Patient } from '../model/patient.model';

@Component({
    selector: 'main-table',
    directives: [DataTable, Column],
    template:`
        <p-dataTable
            [value]="patients"
            selectionMode="single">
            <p-column field="internalNumber" header="Nummer">   </p-column>
            <p-column field="lastName"       header="Name">     </p-column>
            <p-column field="firstName"      header="Vorname">  </p-column>
            <p-column field="street"         header="Strasse">  </p-column>
            <p-column field="zip"            header="PLZ">      </p-column>
            <p-column field="city"           header="Ort">      </p-column>
            <p-column field="dateOfBirth"    header="Geb.Datum"></p-column>
        </p-dataTable>
    `
})
export class MainTable {
    @Input()
    patients: Patient[];
}