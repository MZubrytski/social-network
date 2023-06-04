import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { MyPostsComponent } from './profile/my-posts/my-posts.component';
import { DialogsComponent } from './dialogs/dialogs.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavigationBarComponent,
    ProfileComponent,
    MyPostsComponent,
    DialogsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    RouterModule
  ],
  exports: [HomeRoutingModule],
  bootstrap: [HomeComponent],
})
export class HomeModule { }
