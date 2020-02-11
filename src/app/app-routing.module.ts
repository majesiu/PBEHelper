import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePlayerComponent } from './create-player/create-player.component';


const routes: Routes = [ 
  { path: '', redirectTo: '/create', pathMatch: 'full' },
  { path: 'create', component: CreatePlayerComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
