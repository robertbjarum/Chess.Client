import { Component, ViewChild } from '@angular/core';
import { BoardSettings } from 'src/app/classes/board-settings';
import { GameResult } from 'src/app/classes/game-result';
import { Move } from 'src/app/classes/move';
import { BoardComponent } from 'src/app/components/gameplay/board/board.component';
import { BoardType } from 'src/app/enums/board-type.enum';
import { PlayerColor } from 'src/app/enums/player-color.enum';
import { BoardStateService } from 'src/app/services/board-state.service';
import { CoordinateNotationParserService } from 'src/app/services/coordinate-notation-parser.service';
import { StockfishService } from 'src/app/services/engines/stockfish.service';

@Component({
	selector: 'app-computer-game-page',
	templateUrl: './computer-game-page.component.html',
	styleUrls: ['./computer-game-page.component.scss']
})
export class ComputerGamePageComponent {

	@ViewChild('board') board: BoardComponent;

	public isGameOver: boolean = false;
	public shouldShowGameOverModal: boolean = false;
	public gameResult: GameResult;
	public boardSettings: BoardSettings = new BoardSettings({
		type: BoardType.Game,
		playerColor: PlayerColor.White
	});

	private displayedDifficulty: number = 10;
	private gameMoves: Move[] = [];

	constructor(private stockfishService: StockfishService, private boardStateService: BoardStateService,
		private coordinateNotationParser: CoordinateNotationParserService) {
		this.boardStateService.setPlayerColor(null);
		this.boardStateService.subscribeToPlayerMoves(move => this.onPlayerMove(move));
		this.boardStateService.subscribeToNonPlayerMoves(move => this.onOpponentMove(move));
		this.boardStateService.subscribeToGameEnd((gameResult: GameResult) => this.onGameEnd(gameResult));
		this.stockfishService.start();
		this.displayedDifficulty = this.stockfishService.getDifficulty();
	}

	public isWhiteActiveColor(): boolean {
		return this.boardStateService.getBoardState().activeColor == PlayerColor.White;
	}

	public onCloseGameOverModal(): void {
		this.shouldShowGameOverModal = false;
	}

	public getEngineState(): string {
		return this.stockfishService.getState();
	}

	public setDifficulty(difficulty: number): void {
		this.stockfishService.setDifficulty(difficulty);
	}

	public getDisplayedDifficulty(): number {
		return this.displayedDifficulty;
	}

	public setDisplayedDifficulty(difficulty: number): void {
		this.displayedDifficulty = difficulty;
	}

	public async switchSides(): Promise<void> {
		this.board.hideLegalMoves();

		this.boardSettings.playerColor = this.boardSettings.playerColor == PlayerColor.White
			? PlayerColor.Black
			: PlayerColor.White;

		this.boardStateService.setPlayerColor(this.boardSettings.playerColor);
		this.board.flipBoard = this.boardSettings.playerColor == PlayerColor.Black;

		if (this.boardStateService.getBoardState().activeColor != this.boardSettings.playerColor) {
			await this.makeEngineMove();
		}
	}

	private onOpponentMove(move: Move): void {
		this.gameMoves.push(move);
	}

	private async onPlayerMove(move: Move): Promise<void> {
		this.gameMoves.push(move);

		await this.makeEngineMove();
	}

	private async makeEngineMove(): Promise<void> {
		var bestMoveString = await this.stockfishService.calculateMove(this.gameMoves);
		var bestMove = this.coordinateNotationParser.toMove(bestMoveString);

		this.boardStateService.applyNonPlayerMove(bestMove.oldX, bestMove.oldY, bestMove.newX, bestMove.newY);
	}

	private onGameEnd(gameResult: GameResult): void {
		this.isGameOver = true;
		this.shouldShowGameOverModal = true;
		this.gameResult = gameResult;
	}
}
