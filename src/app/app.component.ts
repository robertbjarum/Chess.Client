// import { Component } from '@angular/core';
// import { SwUpdate } from '@angular/service-worker';
// import { UpdateService } from 'src/app/services/updates/update.service';

// @Component({
// 	selector: 'app-root',
// 	templateUrl: './app.component.html',
// 	styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
// 	title = 'K-Chess';

// 	constructor(updateService: UpdateService) {
// 		updateService.checkForUpdates();
// 	}
// }

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { InitializeService } from '@kognifai/poseidon-ng-initialize-service';
import { Subscription } from 'rxjs';
import { SidebarsVisibilityService } from '@kognifai/poseidon-sidebar-visibilityservice';
import { SettingsMenuService } from '@kognifai/poseidon-ng-settings-menu';
import { Sublocation, NavigationSubitemsService } from '@kognifai/poseidon-ng-navigation-subitems-service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    public initializing: boolean;
    public navigationVisible: boolean;

    private subscription: Subscription;
    private navigationVisibilitySubscription: Subscription;
    private sublocations: Sublocation[] = [];

    constructor(
        private router: Router,
        private initializeService: InitializeService,
        public sidebarsVisibilityService: SidebarsVisibilityService,
        private settingsMenuService: SettingsMenuService,
        private navigationSubitemsService: NavigationSubitemsService
    ) {
        this.initializing = true;
        this.navigationVisible = true;
    }

    ngOnInit() {
        // PWA:- Checking Network Status
        this.updateNetworkStatusUI();
        window.addEventListener('online', this.updateNetworkStatusUI);
        window.addEventListener('offline', this.updateNetworkStatusUI);

        this.subscription = this.initializeService.initialize().subscribe(
          () => { },
          (error) => { console.log('Initialize error.'); },
          () => {
              // finished
              // If we want applications settings menu item turn this below line on
              // this.settingsMenuService.ShowAppSettingsItem();
              this.initializing = false;
              this.router.initialNavigation();
              this.navigationSubitemsService.populateSidebar(this.sublocations);
          }
        );

        this.navigationVisibilitySubscription = this.sidebarsVisibilityService.navigationVisibilityChanged.subscribe((visible: boolean) => {
            this.navigationVisible = visible;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.navigationVisibilitySubscription.unsubscribe();
    }

    // Checking App Status, whether its online or offline
    private updateNetworkStatusUI() {
        if (navigator.onLine) {
            // you might be online
            (document.getElementsByTagName('body') as any).style = '';
        } else {
            // 100% sure, you are offline
            (document.getElementsByTagName('body') as any).style = 'filter: grayscale(1)';
        }
    }
}
