class SetRemainingBoards {
	public constructor() {
	}
	private table: Array<number> = new Array;
	public static ins: SetRemainingBoards = new SetRemainingBoards;
	private nlhTables: NlhRemainingCardsIndexTables = new NlhRemainingCardsIndexTables;
	private omahaTables: OmahaRemainingCardsIndexTables = new OmahaRemainingCardsIndexTables;
	public getBoardsFunc: Function;

	private curIndex: number = 0;
	public reset() {
		this.curIndex = 0;
	}

	public setTable() {
		var needBoardsNum = 5 - CardTypeUtil.ins.selectedBoardsNum;
		if (needBoardsNum != 0) {
			var tableName = CardsData.ins.players.length + "_" + needBoardsNum;
			var handlength = CardsData.ins.players[0].getPlayerCardsLength();
			if (HomePage.ins.gameType == GameType.NLH) {
				this.table = this.nlhTables.map[tableName];
			} else {
				this.table = this.omahaTables.map[handlength + "_" + tableName];
			}
			if (needBoardsNum == 5) {
				this.getBoardsFunc = this.getFiveCards;
			} else if (needBoardsNum == 2) {
				this.getBoardsFunc = this.getTwoCards;
			} else {
				this.getBoardsFunc = this.getOneCards;
			}
		}
	}

	private getFiveCards() {
		this.getNextEle(); CardTypeUtil.ins.calcList[0] = this.tempCard;
		this.getNextEle(); CardTypeUtil.ins.calcList[1] = this.tempCard;
		this.getNextEle(); CardTypeUtil.ins.calcList[2] = this.tempCard;
		this.getNextEle(); CardTypeUtil.ins.calcList[3] = this.tempCard;
		this.getNextEle(); CardTypeUtil.ins.calcList[4] = this.tempCard;
	}

	private getTwoCards() {
		this.getNextEle(); CardTypeUtil.ins.calcList[3] = this.tempCard;
		this.getNextEle(); CardTypeUtil.ins.calcList[4] = this.tempCard;
	}

	private getOneCards() {
		this.getNextEle(); CardTypeUtil.ins.calcList[4] = this.tempCard;
	}

	private tempCard: CardObject;
	public getNextEle() {
		this.tempCard = CardTypeUtil.ins.remainingCardsObj[this.table[this.curIndex]];
		this.curIndex++;
	}
}