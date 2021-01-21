import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAccountPageComponent } from './pages/create-account-page/create-account-page.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { OfflineGamePageComponent } from './pages/offline-game-page/offline-game-page.component';
import { ComputerGamePageComponent } from './pages/computer-game-page/computer-game-page.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
import { ApplicationsGuardService } from './applications-guard.service';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { GlobalSettingsComponent } from '@kognifai/poseidon-ng-global-settings';
import { UnauthorizedModule, UnauthorizedComponent } from '@kognifai/poseidon-ng-unauthorized-component';
import { PageNotFoundComponent } from '@kognifai/poseidon-ng-page-not-found-component';

const routes: Routes = [
	{ path: 'unauthorized', component: UnauthorizedComponent },
	{
	  path: '',
	  canActivate: [ApplicationsGuardService],
	  children: [
		{ path: 'appsettings', component: AppSettingsComponent, pathMatch: 'full' },
		{ path: 'globalsettings', component: GlobalSettingsComponent, pathMatch: 'full' },
		{ path: 'offline-game', component: OfflineGamePageComponent },
    	{ path: 'computer-game', component: ComputerGamePageComponent },
		{ path: '', component: HomePageComponent, pathMatch: 'full' },
		{ path: '**', component: PageNotFoundComponent }
]
	}
  ];
  
  @NgModule({
	imports: [UnauthorizedModule, RouterModule.forRoot(routes, { useHash: true, initialNavigation: false })],
	exports: [RouterModule]
  })
  export class AppRoutingModule { }
  
// const routes: Routes = [
// 	{ path: '', component: HomePageComponent },
// 	{ path: 'game/:id', component: GamePageComponent },
// 	{ path: 'create-account', component: CreateAccountPageComponent },
// 	{ path: 'log-in', component: LogInComponent },
// 	{ path: 'settings', component: UserSettingsComponent }
// ];

// @NgModule({
// 	imports: [RouterModule.forRoot(routes)],
// 	exports: [RouterModule]
// })
// export class AppRoutingModule { }
