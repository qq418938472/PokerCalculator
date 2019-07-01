class CardTypeUtil {
	public constructor() {
	}

	public static ins: CardTypeUtil = new CardTypeUtil;
	public allCards: Array<number>;
	public selectedCards: Array<number>;
	public remainingCards: Array<number>;
	public remainingCardsObj: Array<CardObject>;
	public calcList: Array<CardObject>;
	public selectedBoardsNum: number;
	public startCalculator() {
		this.resetPlayers();
		this.initCalcList();
		this.setRemainingCards();
		this.disorderRemainingCards();
		SetRemainingBoards.ins.setTable();
		this.setWinNumber();
		HomePage.ins.showResult();
	}

	public initCalcList() {
		this.calcList = [];
		var cardNum = HomePage.ins.gameType == GameType.NLH ? 7 : 5;
		for (var i = 0; i < cardNum; i++) {
			var card = new CardObject;
			this.calcList.push(card);
		}
	}

	private resetPlayers() {
		CardsData.ins.players.map(player => {
			player.resetPlayer();
		});
	}

	private setRemainingCards() {
		this.allCards = [];
		this.selectedCards = [];
		this.remainingCards = [];
		this.remainingCardsObj = [];
		this.selectedBoardsNum = 0;
		CardsData.ins.allChooseCards.map(card => {
			this.allCards.push(card.code);
		});
		CardsData.ins.boards.map((card, index) => {
			if (card.code) {
				this.selectedCards.push(card.code);
				this.selectedBoardsNum++;
				this.calcList[index] = this.createCard(card.code);
			}
		});
		CardsData.ins.players.map(player => {
			player.cards.map(card => {
				this.selectedCards.push(card.code);
			});
		});
		this.allCards.map(card => {
			if (this.selectedCards.indexOf(card) == -1) {
				this.remainingCards.push(card);
			}
		});
	}

	private disorderRemainingCards() {
		var code;
		var [...cards] = this.remainingCards;
		for (var i = cards.length; i > 0; i--) {
			// 产生随机数
			var num = Math.floor(Math.random() * cards.length);
			code = cards.splice(num, 1);
			this.remainingCardsObj.push(this.createCard(code[0]));
		}
	}

	// private setWinNumber() {
	// 	var calcTimes = 1;
	// 	SetRemainingBoards.ins.reset();
	// 	var setPlayerDataFunc = HomePage.ins.gameType == GameType.NLH ? this.nlhSetPlayerData : this.omahaSetPlayerData;
	// 	this.reset();
	// 	if (this.selectedBoardsNum < 5) {
	// 		SetRemainingBoards.ins.getBoardsFunc.call(SetRemainingBoards.ins);
	// 	}
	// 	console.log('公共牌', CardTypeUtil.ins.calcList);
	// 	setPlayerDataFunc.call(this);
	// 	this.updateWins();
	// 	for (var i = 0; i < CardsData.ins.players.length; i++) {
	// 		CardsData.ins.players[i].winProbability = (CardsData.ins.players[i].winNumber / 1 * 100).toFixed(2) + "%";
	// 	}
	// 	console.log('计算最后得到的玩家数据', CardsData.ins.players);
	// }

	private setWinNumber() {
		var startTime = egret.getTimer();
		var calcTimes = 3000;
		SetRemainingBoards.ins.reset();
		var setPlayerDataFunc = HomePage.ins.gameType == GameType.NLH ? this.nlhSetPlayerData : this.omahaSetPlayerData;
		for (var i = 1; i <= calcTimes; i++) {
			if (i % 3000 == 0) {
				SetRemainingBoards.ins.reset();
			}
			this.reset();
			if (this.selectedBoardsNum < 5) {
				SetRemainingBoards.ins.getBoardsFunc.call(SetRemainingBoards.ins);
			}
			setPlayerDataFunc.call(this);
			this.updateWins();
		}
		var endTime = egret.getTimer();
		console.log('开始计算总时间', endTime - startTime);
		egret.log(endTime - startTime);
		for (var i = 0; i < CardsData.ins.players.length; i++) {
			CardsData.ins.players[i].winProbability = (CardsData.ins.players[i].winNumber / calcTimes * 100).toFixed(2) + "%";
		}
		console.log('计算最后得到的玩家数据', CardsData.ins.players);
		HomePage.ins.lab_tips.text = '计算时长:' + (endTime - startTime) + 'ms';
	}

	// 找出赢得玩家并++
	private nlhSetPlayerData() {
		for (var i = 0; i < CardsData.ins.players.length; i++) {
			this.calcList[5] = CardsData.ins.players[i].cards[0];
			this.calcList[6] = CardsData.ins.players[i].cards[1];
			CardsData.ins.players[i].cardPower = SetCardPower.ins.initCardPower(this.calcList);
			this.addMaxPower(CardsData.ins.players[i].cardPower, CardsData.ins.players[i]);
		}
	}

	private omahaSetPlayerData() {
		for (var i = 0; i < CardsData.ins.players.length; i++) {
			// 切换出5张手牌来，取出最大的值
			CardsData.ins.players[i].cardPower = SetOmahaCardPower.ins.initCardPower(CardsData.ins.players[i].cards, this.calcList);
			this.addMaxPower(CardsData.ins.players[i].cardPower, CardsData.ins.players[i]);
		}
	}

	private count: number;
	private maxPower: number = 0;
	private tempPlayerList: Array<any> = new Array;
	private reset() {
		this.maxPower = Number.MIN_VALUE;
		this.count = 0;
	}

	private addMaxPower(p: number, player: Player) {
		if (p > this.maxPower) {
			this.maxPower = p;
			this.tempPlayerList[0] = player;
			this.count = 1;
		} else if (p == this.maxPower) {//相同牌力
			this.tempPlayerList[this.count] = player;
			this.count++;
		}
	}

	private updateWins() {
		var win: number = Math.floor(1 / this.count * 10000) / 10000;
		for (var i = 0; i < this.count; i++) {
			this.tempPlayerList[i].winNumber += win;
		}
	}

	private createCards(com: Array<any>): Array<any> {
		var cards: Array<any> = new Array;
		for (var i = 0; i < com.length; i++) {
			cards.push(this.createLine(com[i]));
		}
		return cards;
	}

	private createLine(arr: Array<number>) {
		var cardLine: Array<CardObject> = new Array;

		for (var i = 0; i < arr.length; i++) {
			cardLine.push(this.createCard(arr[i]));
		}
		cardLine.sort(this.sortCard);
		return cardLine;
	}

	private sortCard(a: CardObject, b: CardObject): number {
		return b.value - a.value;
	}

	private createCard(code: number): CardObject {
		var obj: CardObject = new CardObject;
		obj.code = code;
		obj.value = Math.floor(code % 256);
		obj.color = Math.floor(code / 256);
		return obj;
	}

	public type_royal_flush: number = 10;
	public type_straight_flush: number = 9;
	public type_four_kind: number = 8;
	public type_full_house: number = 7;
	public type_flush: number = 6;
	public type_straight: number = 5;
	public type_three_kind: number = 4;
	public type_two_pairs: number = 3;
	public type_one_pair: number = 2;
	public type_hight_card: number = 1;
}
