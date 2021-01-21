import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnDestroy {
	public title = 'K-Chess';
	public shouldShowSendChallengeModal: boolean = false;

	@ViewChild('container') public containerElement: ElementRef;

	public ngOnDestroy(): void {
		this.containerElement.nativeElement.remove();
	}

	public showSendChallengeModal(): void {
		// if (!this.loginStateService.isLoggedIn()) {
		// 	this.toastr.error('You must be logged in to send a challenge', 'Cannot send challenge');
		// } else {
		// 	this.shouldShowSendChallengeModal = true;
		// }
	}

	public hideSendChallengeModal(): void {
		this.shouldShowSendChallengeModal = false;
	}
}

