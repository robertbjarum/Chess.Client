import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { PieceType } from 'src/app/enums/piece-type.enum';
import { PlayerColor } from 'src/app/enums/player-color.enum';

@Component({
	selector: 'app-piece',
	templateUrl: './piece.component.html',
	styleUrls: ['./piece.component.scss']
})
export class PieceComponent implements AfterViewInit {
	@Input() xCoord: number;
	@Input() yCoord: number;
	@Input() color: PlayerColor;
	@Input() pieceType: PieceType;
	@Input() flipBoard: boolean;
	@Input() board: HTMLElement;

	@ViewChild('piece') piece: ElementRef<HTMLElement>;

	public isDragging: boolean = false;
	private draggingXPosition: number = 0;
	private draggingYPosition: number = 0;
	private boundingRect: DOMRect;
	private boardBoundingRect: DOMRect;

	private colorClassMap: Map<PlayerColor, string> = new Map<PlayerColor, string>([
		[PlayerColor.White, "white"],
		[PlayerColor.Black, "black"]
	])

	private pieceTypeClassMap: Map<PieceType, string> = new Map<PieceType, string>([
		[PieceType.Pawn, "pawn"],
		[PieceType.King, "king"],
		[PieceType.Queen, "queen"],
		[PieceType.Rook, "rook"],
		[PieceType.Bishop, "bishop"],
		[PieceType.Knight, "knight"]
	])

	public ngAfterViewInit(): void {
		this.updateDimensions();
		this.configureContextMenu();
	}

	public onBoardSizeChange(): void {
		this.updateDimensions();
	}

	public setFlipBoard(flipBoard: boolean) {
		this.flipBoard = flipBoard;
	}

	public getPieceTransform(): string {
		let displayX = this.xCoord;
		let displayY = this.yCoord;

		if (this.flipBoard) {
			displayX = 7 - displayX;
			displayY = 7 - displayY;
		}

		if (this.isDragging) {
			return this.getDraggingTransform();
		}
		return `translate(${displayX * 100}%, ${displayY * 100}%)`;
	}

	public getColorClass(): string {
		return this.colorClassMap.get(this.color) ?? '';
	}

	public getPieceTypeClass(): string {
		return this.pieceTypeClassMap.get(this.pieceType) ?? '';
	}

	public onPieceMouseDown(event: MouseEvent): void {
		this.draggingXPosition = event.clientX;
		this.draggingYPosition = event.clientY;

		this.isDragging = true;

		document.onmouseup = (event) => this.stopDragging(event)
		document.onmousemove = (event) => this.dragPiece(event)
	}

	public onPieceTouchStart(event: TouchEvent): void {
		let touch = event.touches[0];

		this.draggingXPosition = touch.clientX;
		this.draggingYPosition = touch.clientY;

		this.isDragging = true;

		document.ontouchend = (event) => this.stopDragging(event.changedTouches[0])
		document.ontouchmove = (event) => this.dragPiece(event.changedTouches[0])
	}

	private stopDragging(event: MouseEvent | Touch): void {
		this.isDragging = false;

		this.placePiece(event);

		document.onmousemove = null;
		document.onmouseup = null;
		document.ontouchend = null;
		document.ontouchmove = null;
	}

	private dragPiece(event: MouseEvent | Touch): void {
		this.draggingXPosition = event.clientX;
		this.draggingYPosition = event.clientY;
	}

	private placePiece(event: MouseEvent | Touch): void {
		let newXPosition = event.clientX - this.boardBoundingRect.left;
		let newYPosition = event.clientY - this.boardBoundingRect.top;

		let newXCoord = Math.round((newXPosition / this.boundingRect.width) - 0.5);
		let newYCoord = Math.round((newYPosition / this.boundingRect.height) - 0.5);

		if (this.isValidCoordinate(newXCoord, newYCoord)) {
			this.xCoord = newXCoord;
			this.yCoord = newYCoord;
		}
	}

	private isValidCoordinate(x: number, y: number): boolean {
		return x >= 0 && y >= 0
			&& x < 8 && y < 8;
	}

	private updateDimensions() {
		this.boundingRect = this.piece.nativeElement.getBoundingClientRect();
		this.boardBoundingRect = this.board.getBoundingClientRect();
	}

	private configureContextMenu() {
		this.piece.nativeElement.oncontextmenu = () => { return false; }
	}

	private getDraggingTransform() {
		let xPosition = this.draggingXPosition - this.boardBoundingRect.left;
		let yPosition = this.draggingYPosition - this.boardBoundingRect.top;

		return `translate(calc(${xPosition}px - 50%), calc(${yPosition}px - 50%))`;
	}
}
