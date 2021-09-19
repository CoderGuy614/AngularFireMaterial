import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/auth/model/user.model';
import { select, Store } from '@ngrx/store';
import * as authActions from '../../auth/auth.actions';
import { AppState } from 'src/app/reducers';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  displayNameForm: FormGroup;

  @Input() user: User;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    ) {
    this.displayNameForm = fb.group({
      displayName: ['', [Validators.required]]
    })
   }

  ngOnInit(): void {
  }

  onSubmitDisplayName() {
    const { displayName } = this.displayNameForm.value;
    this.store.dispatch(authActions.updateDisplayName({ payload: displayName }));
    var displayNameModalEl = document.querySelector('#editDisplayName');
    var modalBackdrop = document.querySelector('.modal-backdrop');
    var modal = Modal.getOrCreateInstance(displayNameModalEl);
    modal.hide();
    modalBackdrop.remove();
  };
};
