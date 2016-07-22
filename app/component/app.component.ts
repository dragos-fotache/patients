import { Component, OnInit} from '@angular/core';

import { Patient } from '../model/patient.model';
import { MainTable } from '../component/main-table.component';
import { PatientsService } from '../service/patients.service';

@Component({
    selector: 'my-app',
    providers: [ PatientsService ],
    directives: [ MainTable ],
    template: `
        <main-table
            [patients]="patients">
        </main-table>
    `
})
export class AppComponent implements OnInit { 

    patients : Array<Patient>;

    constructor (private patientsService: PatientsService) {
    }

    ngOnInit() {
        this.patientsService.getPatients().then(
            patients  => {
                this.patients = patients;
                console.log(patients);
            },
            error =>  console.log("error")
        );
    }

}
