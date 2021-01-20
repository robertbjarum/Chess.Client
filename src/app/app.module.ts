import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ConfigService } from './services/config/config.service';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

// Kognifai
import { AppLocationsService } from '@kognifai/poseidon-ng-applocationsservice';
import { AuthenticationInterceptor } from '@kognifai/poseidon-ng-authenticationinterceptor';
import { AuthenticationService as AuthenticationSvc } from '@kognifai/poseidon-authenticationservice';
import { AuthenticationService } from '@kognifai/poseidon-ng-authenticationservice';
import { ConfigurationService } from '@kognifai/poseidon-ng-configurationservice';
import { CookieService } from '@kognifai/poseidon-cookieservice';
import { DataContextService } from '@kognifai/poseidon-datacontextservice';
import { HeaderModule } from '@kognifai/poseidon-header-component';
import { IConfiguration } from '@kognifai/poseidon-configurationinterface';
import { InitializeService } from '@kognifai/poseidon-ng-initialize-service';
import { MessageModule } from '@kognifai/poseidon-ng-message-component';
import { MessageService } from '@kognifai/poseidon-message-service';
import { NavigationService } from '@kognifai/poseidon-ng-navigationservice';
import { NavigationSidebarModule } from '@kognifai/poseidon-navigationsidebar-component';
import { SettingsService } from '@kognifai/poseidon-ng-settingsservice';
import { SidebarsVisibilityService } from '@kognifai/poseidon-sidebar-visibilityservice';
import { ToolsMenuModule } from '@kognifai/poseidon-toolsmenu';
import { GlobalSettingsModule } from '@kognifai/poseidon-ng-global-settings';
import { LoadingComponentModule } from '@kognifai/poseidon-ng-loading-component';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApplicationsGuardService } from './applications-guard.service';

import { NavigationSubitemsService } from '@kognifai/poseidon-ng-navigation-subitems-service';
import { PageNotFoundModule } from '@kognifai/poseidon-ng-page-not-found-component';

// Poseidon generated components
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { MainComponent } from './main/main.component';

// Original Chess.Client Components
import { BoardComponent } from './components/gameplay/board/board.component';
import { PieceComponent } from './components/gameplay/piece/piece.component';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { CreateAccountPageComponent } from './pages/create-account-page/create-account-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { PawnPromotionComponent } from './components/gameplay/pawn-promotion/pawn-promotion.component';
import { ChallengesComponent } from './components/navigation/challenges/challenges.component';
import { GameSettingsModalComponent } from './components/navigation/game-settings-modal/game-settings-modal.component';
import { SendChallengeModalComponent } from './components/navigation/send-challenge-modal/send-challenge-modal.component';
import { OfflineGamePageComponent } from './pages/offline-game-page/offline-game-page.component';
import { NavbarButtonComponent } from './components/navigation/navbar-button/navbar-button.component';
import { NotificationsComponent } from './components/navigation/notifications/notifications.component';
import { GameOverModalComponent } from './components/navigation/game-over-modal/game-over-modal.component';
import { GameControlsComponent } from './components/gameplay/game-controls/game-controls.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DrawOfferStatusComponent } from './components/gameplay/draw-offer-status/draw-offer-status.component';
import { UpdateToastComponent } from './components/toasts/update-toast/update-toast.component';
import { ComputerGamePageComponent } from './pages/computer-game-page/computer-game-page.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';

// Angular Material
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

export function initConfig(config: ConfigurationService<IConfiguration>) {
	return () => config.load();
 }

@NgModule({
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		FormsModule,
		HeaderModule,
		HttpClientModule,
		MessageModule,
		NavigationSidebarModule,
		ReactiveFormsModule,
		ToolsMenuModule,
		GlobalSettingsModule,
		LoadingComponentModule,
		PageNotFoundModule,
		AppRoutingModule,
		CommonModule,				// Chess.Client
		ToastrModule.forRoot({
			progressBar: true,
			closeButton: true,
			positionClass: 'toast-top-center'
		}),
		NgxSpinnerModule,
		MatSliderModule,
		MatMenuModule,
		MatSelectModule,
		MatFormFieldModule,
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
	],
	declarations: [
		AppComponent,
		AppSettingsComponent,
		MainComponent,
		BoardComponent,
		PieceComponent,
		NavbarComponent,
		CreateAccountPageComponent,
		HomePageComponent,
		GamePageComponent,
		LogInComponent,
		PawnPromotionComponent,
		ChallengesComponent,
		GameSettingsModalComponent,
		SendChallengeModalComponent,
		OfflineGamePageComponent,
		NavbarButtonComponent,
		NotificationsComponent,
		GameOverModalComponent,
		GameControlsComponent,
		DrawOfferStatusComponent,
		UpdateToastComponent,
		ComputerGamePageComponent,
		UserSettingsComponent
	],
	entryComponents: [ ],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthenticationInterceptor,
			multi: true
		}, {
			provide: APP_INITIALIZER,
			useFactory: initConfig, 
			multi: true,
			deps: [ConfigurationService]
		},
		AppLocationsService,
		ApplicationsGuardService,
		AuthenticationSvc,
		AuthenticationService,
		ConfigurationService,
		CookieService,
		DataContextService,
		InitializeService,
		MessageService,
		NavigationService,
		SettingsService,
		SidebarsVisibilityService,
		NavigationSubitemsService
	],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
