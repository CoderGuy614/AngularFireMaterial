import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { User } from 'src/app/auth/model/user.model';
import * as authActions from '../../auth/auth.actions';
import { generateRandomPic } from 'src/app/auth/utils/randomPicGenerator';

@Component({
  selector: 'app-edit-photo-url-modal',
  templateUrl: './edit-photo-url-modal.component.html',
  styleUrls: ['./edit-photo-url-modal.component.css']
})
export class EditPhotoURLModalComponent implements OnInit {
  photoURLForm: FormGroup;
  photoURLPlaceholder: string = "Enter a Photo URL"


  constructor(private store: Store,
    private fb: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: User
    
    ) {
      this.photoURLForm = fb.group({
        photoURL: ['', [Validators.required]]
      });
    };

  ngOnInit(): void {
  };

  onChooseRandom(){
    this.photoURLForm.get('photoURL').patchValue(generateRandomPic());
  }

  onSubmitPhotoURL() {
    const { photoURL } = this.photoURLForm.value;
    this.store.dispatch(authActions.updatePhotoURL({ payload: photoURL }));
  };

};
