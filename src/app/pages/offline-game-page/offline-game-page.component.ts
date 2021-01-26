import { Component, OnInit } from '@angular/core';
import { GameResult } from 'src/app/classes/game-result';
import { PlayerColor } from 'src/app/enums/player-color.enum';
import { BoardStateService } from 'src/app/services/board-state.service';

@Component({
	selector: 'app-offline-game-page',
	templateUrl: './offline-game-page.component.html',
	styleUrls: ['./offline-game-page.component.scss']
})
export class OfflineGamePageComponent implements OnInit {

	public title: string = "Playing against yourself";
	public isGameOver: boolean = false;
	public shouldShowGameOverModal: boolean = false;
	public gameResult: GameResult;
    public notificationTitle = 'Welcome!';
    public notificationText = '';
    public notificationClass = 'kx-notification--success';

	public whiteToPlay: boolean = true;
	
	constructor(private boardStateService: BoardStateService) {
		this.boardStateService.setPlayerColor(null);
		this.boardStateService.subscribeToGameEnd((gameResult: GameResult) => this.onGameEnd(gameResult));
	}

	ngOnInit() {
		this.getPlayerColor();
	}

	getPlayerColor(): void {
		this.boardStateService.getActivePlayerObservable()
			.subscribe( playerColor =>  {
				this.whiteToPlay = playerColor == PlayerColor.White;
				if ( this.whiteToPlay ) {
					this.notificationTitle = "White to play"
				} else {
					this.notificationTitle = "Black to play"
				}
			});
	}

	public onCloseGameOverModal(): void {
		this.shouldShowGameOverModal = false;
	}

	private onGameEnd(gameResult: GameResult): void {
		this.isGameOver = true;
		this.notificationTitle = "Game over!"
		this.notificationText =  `${PlayerColor[gameResult.winnerColor]} wins by ${gameResult.termination}`;

		//this.shouldShowGameOverModal = true;
		this.gameResult = gameResult;
	}
}
