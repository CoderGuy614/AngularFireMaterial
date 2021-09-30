import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { User } from 'src/app/auth/model/user.model';
import * as authActions from '../../auth/auth.actions';

@Component({
  selector: 'app-edit-display-name-modal',
  templateUrl: './edit-display-name-modal.component.html',
  styleUrls: ['./edit-display-name-modal.component.css']
})
export class EditDisplayNameModalComponent implements OnInit {
  displayNameForm: FormGroup;
  displayNamePlaceholder: string = "Enter a Display Name"


  constructor(private store: Store,
    private fb: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: User
    
    ) {
      this.displayNameForm = fb.group({
        displayName: ['', [Validators.required]]
      });
    }

  ngOnInit(): void {
  }

  onSubmitDisplayName() {
    const { displayName } = this.displayNameForm.value;
    this.store.dispatch(authActions.updateDisplayName({ payload: displayName }));
  };

}
