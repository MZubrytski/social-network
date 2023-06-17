import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { ProfileComponent } from './profile/profile.component';
import { DialogsComponent } from './dialogs/dialogs.component';
import { UsersComponent } from './users/users.component';

export const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
          {path: '', redirectTo: '/home/profile', pathMatch: 'full'},
          {path: 'profile', component: ProfileComponent},
          {path: 'profile/:id', component: ProfileComponent},
          {path: 'dialogs', component: DialogsComponent},
          {path: 'users', component: UsersComponent},
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
