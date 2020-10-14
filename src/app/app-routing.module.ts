import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePlayerComponent } from './create-player/create-player.component';
import { UpdatePlayerComponent } from './update-player/update-player.component';
import { PlayerCalcComponent } from './player-calc/player-calc.component';


const routes: Routes = [ 
  { path: '', component: CreatePlayerComponent},
  // { path: 'update', component: UpdatePlayerComponent },
  { path: 'calc', component: PlayerCalcComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
