class CardsData {
	public load() {
	}

	public static ins: CardsData = new CardsData;
	public allChooseCards: Array<CardObject>;
	public boards: Array<CardObject>;
	public players: Array<Player>;
	public activeCard: CardObject;
	public cardColors = ['♦', '♣', '♥', '♠'];
	public cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
	public playerNumber = 2;
	public initCards() {
		this.boards = [];
		this.players = [];
		this.allChooseCards = [];
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 13; j++) {
				var card = new CardObject();
				card.color = i + 1;
				card.value = j + 2;
				card.code = card.color * 256 + card.value;
				this.allChooseCards.push(card);
			}
		}
		for (var i = 0; i < 5; i++) {
			var card = new CardObject();
			this.boards.push(card);
		}
		var cardNum = HomePage.ins.gameType == GameType.NLH ? 2 : 5;
		for (var i = 0; i < this.playerNumber; i++) {
			var player = new Player();
			player.cards = [];
			for (var j = 0; j < cardNum; j++) {
				var cards = new CardObject();
				player.cards.push(cards);
			}
			this.players.push(player);
		}
	}

	public addPlayer() {
		this.playerNumber++;
		var player = new Player();
		player.cards = [];
		var cardNum = HomePage.ins.gameType == GameType.NLH ? 2 : 5;
		for (var j = 0; j < cardNum; j++) {
			var cards = new CardObject();
			player.cards.push(cards);
		}
		this.players.push(player);
	}

	public setBoards(card: CardObject) {
		for (var i = 0; i <= this.boards.length - 1; i++) {
			if (this.boards[i].isActive) {
				this.boards[i].code = card.code;
				this.boards[i].value = card.value;
				this.boards[i].color = card.color;
				this.boards[i].isActive = false;
			}
		}
	}
}