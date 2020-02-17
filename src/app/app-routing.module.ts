import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePlayerComponent } from './create-player/create-player.component';
import { UpdatePlayerComponent } from './update-player/update-player.component';


const routes: Routes = [ 
  { path: '', redirectTo: '/create', pathMatch: 'full' },
  { path: 'create', component: CreatePlayerComponent },
  { path: 'update', component: UpdatePlayerComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
