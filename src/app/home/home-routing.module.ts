import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { UsersComponent } from './users/users.component';
import { ProfileContainerComponent } from './profile/profile-container/profile-container.component';
import { UsersContainerComponent } from './users/users-container/users-container.component';

export const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
          {path: '', redirectTo: '/home/profile', pathMatch: 'full'},
          {path: 'profile', component: ProfileContainerComponent},
          {path: 'profile/:id', component: ProfileContainerComponent},
          {path: 'users', component: UsersContainerComponent},
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(
          homeRoutes
        )
    ]
})

export class HomeRoutingModule {}
