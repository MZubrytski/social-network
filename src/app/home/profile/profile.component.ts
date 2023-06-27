import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Profile } from 'src/app/shared/models/Profile';
import { updateUserPhoto, updateUserProfile } from 'src/app/store/features/profile/actions/profile.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnChanges {
  @Input() profile!: Profile;
  @Input() userId!: number;
  @Input() isLoading!: boolean;
  profileForm!: FormGroup;
  selectedFile: File | null = null;
  editingMode = false;

  constructor(private store: Store) {}

  get isOwner(){
    return this.userId === this.profile.userId
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['profile'] && changes['profile'].currentValue) {
      this.profileForm = new FormGroup({
        fullName: new FormControl(this.profile.fullName, {validators: [Validators.required]}),
        aboutMe: new FormControl(this.profile.aboutMe),
        lookingForAJob: new FormControl(this.profile.lookingForAJob),
        lookingForAJobDescription: new FormControl(this.profile.lookingForAJobDescription),
        contacts: new FormGroup({
          facebook: new FormControl(this.profile.contacts.facebook, {validators: [Validators.pattern('^(http|https)://[a-z0-9]+([-._][a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$')]}),
          website: new FormControl(this.profile.contacts.website, {validators: [Validators.pattern('^(http|https)://[a-z0-9]+([-._][a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$')]}),
          github: new FormControl(this.profile.contacts.github, {validators: [Validators.pattern('^(http|https)://[a-z0-9]+([-._][a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$')]}),
          vk: new FormControl(this.profile.contacts.vk, {validators: [Validators.pattern('^(http|https)://[a-z0-9]+([-._][a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$')]}),
          twitter: new FormControl(this.profile.contacts.twitter, {validators: [Validators.pattern('^(http|https)://[a-z0-9]+([-._][a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$')]}),
          instagram: new FormControl(this.profile.contacts.instagram, {validators: [Validators.pattern('^(http|https)://[a-z0-9]+([-._][a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$')]}),
          mainLink: new FormControl(this.profile.contacts.mainLink, {validators: [Validators.pattern('^(http|https)://[a-z0-9]+([-._][a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$')]}),
          youtube: new FormControl(this.profile.contacts.youtube, {validators: [Validators.pattern('^(http|https)://[a-z0-9]+([-._][a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$')]}),
        })
    });
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length) {
      this.selectedFile = event.target.files[0] as File;
      this.store.dispatch(updateUserPhoto({
        photo: this.selectedFile
      }))
    }
  }

  toggleEditMode(): void {
    this.editingMode = !this.editingMode;
  }

  saveChangedProfile() {
    this.editingMode = false;
    this.updateUserProfile()
  }

  updateUserProfile() {
    this.store.dispatch(updateUserProfile({
      profile: this.profileForm.value
    }))
  }
}
