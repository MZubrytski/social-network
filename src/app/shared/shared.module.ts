import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderComponent } from './header/header.component';
import { PaginatorComponent } from './paginator/paginator.component';


@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MainLayoutComponent,
    HeaderComponent,
    PaginatorComponent
  ]

})
export class SharedModule { }
