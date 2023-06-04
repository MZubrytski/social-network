import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { ProfileComponent } from './profile/profile.component';
import { DialogsComponent } from './dialogs/dialogs.component';

export const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
          {path: '', redirectTo: '/home/profile', pathMatch: 'full'},
          {path: 'profile', component: ProfileComponent},
          {path: 'dialogs', component: DialogsComponent},
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
