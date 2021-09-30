import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/auth/model/user.model';
import { select, Store } from '@ngrx/store';
import * as authActions from '../../auth/auth.actions';
import { AppState } from 'src/app/reducers';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditDisplayNameModalComponent } from '../edit-display-name-modal/edit-display-name-modal.component';
import { EditPhotoURLModalComponent } from '../edit-photo-url-modal/edit-photo-url-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() user: User;
  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
  };

  openEditDisplayNameModal():void {
    const dialogRef = this.dialog.open(EditDisplayNameModalComponent, {
      width: '350px',
      data: this.user
    })
  };

  openEditPhotoURLModal():void {
    const dialogRef = this.dialog.open(EditPhotoURLModalComponent, {
      width: '350px',
      data: this.user
    })
  };

}

