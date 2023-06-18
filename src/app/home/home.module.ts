import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { ProfileContainerComponent } from './profile/profile-container/profile-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersContainerComponent } from './users/users-container/users-container.component';
import { UsersComponentStore } from './users/users-store';

@NgModule({
  declarations: [
    HomeComponent,
    NavigationBarComponent,
    ProfileComponent,
    UsersComponent,
    ProfileContainerComponent,
    UsersContainerComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UsersComponentStore],
  exports: [HomeRoutingModule],
  bootstrap: [HomeComponent],
})
export class HomeModule { }
