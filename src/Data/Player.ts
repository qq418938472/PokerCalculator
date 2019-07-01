class Player {
	public constructor() {
		this.playerInit();
	}
	public cards: Array<CardObject>
	public winProbability: string;
	public winNumber: number;
	public cardPower: number;
	public playerInit() {
		this.cards = new Array;
		this.winNumber = 0;
		this.winProbability = "";
	}

	public resetPlayer() {
		this.winNumber = 0;
		this.winProbability = "";
	}

	public getPlayerCardsLength() {
		var num = 0;
		for (var i = 0; i < this.cards.length; i++) {
			if (this.cards[i].code != 0) {
				num++;
			}
		}
		return num;
	}
}