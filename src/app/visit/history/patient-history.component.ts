import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Visit } from '../visit.service';
@Component({
    selector: 'app-patient-history',
    templateUrl: './patient-history.component.html'
})
export class PatientHistoryComponent implements OnInit {

    displayedColumns = ['id', 'entryDatetime', 'entryCause', 'isFinished', 'actions'];
    dataSource: MatTableDataSource<Visit>;

    constructor(public dialogRef: MatDialogRef<PatientHistoryComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Array<Visit>) { }

    ngOnInit(): void {
        if (this.dialogRef.componentInstance.data['patientHistory'] !== null) {
            this.dataSource = this.dialogRef.componentInstance.data['patientHistory'];
        }
    }

    showStatus(status: boolean) {
        return status ? 'Teve alta' : 'Em atendimento';
    }
}  