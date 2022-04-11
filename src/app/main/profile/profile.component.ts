import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() userName!: string;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  show() {
    this.dialog.open(DialogElementsExampleDialog);
  }

}


export class DialogElementsExampleDialog { }
