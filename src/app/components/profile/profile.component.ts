import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/auth/model/user.model';
import { select, Store } from '@ngrx/store';
import * as authActions from '../../auth/auth.actions';
import { AppState } from 'src/app/reducers';
import { closeModal } from '../../auth/utils/modalHelpers';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  displayNameForm: FormGroup;
  photoURLForm: FormGroup;
  photoURLPlaceholder: string = "Enter a Photo URL"
  displayNamePlaceholder: string = "Enter a Display Name"

  @Input() user: User;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    ) {
    this.displayNameForm = fb.group({
      displayName: ['', [Validators.required]]
    });
    this.photoURLForm = fb.group({
      photoURL: ['', [Validators.required]]
    });
   }

  ngOnInit(): void {
  }

  onSubmitDisplayName() {
    const { displayName } = this.displayNameForm.value;
    this.store.dispatch(authActions.updateDisplayName({ payload: displayName }));
    closeModal('editDisplayName');
  };

  onSubmitPhotoURL() {
    const { photoURL } = this.photoURLForm.value;
    this.store.dispatch(authActions.updatePhotoURL({ payload: photoURL }));
    closeModal('editPhotoURL');
  };
};
