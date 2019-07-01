class HomePage extends ViewBase {
	public constructor() {
		super();
		this.skinName = HomePageSkin;
		HomePage.ins = this;
		this.gameType = GameType.NLH;
		this.initHomePage();
		this.addEvent();
	}

	public static ins: HomePage;
	public boardsUI: Array<HomePageCardUI>;
	public lab_tips: eui.Label;
	public gameType: number;
	private g_common: eui.Group;
	private g_playerList: eui.Group;
	private players: Array<PlayerUI>;
	private btn_add: eui.Label;
	private g_scroller: eui.Scroller;
	private btn_calculate: eui.Button;
	private btn_clear: eui.Button;
	private btn_switch: eui.Button;

	private demoImg: eui.Image

	protected onshow() {
		this.boardsUI.map(s => {
			s.isActiveCard = false;
		})
		this.players.map(player => {
			player.cards.map(card => {
				card.isActiveCard = false;
			})
		})
	}

	public initHomePage() {
		CardsData.ins.initCards();
		this.boardsUI = [];
		for (var i = 0; i < 5; i++) {
			var card = new HomePageCardUI(undefined, undefined);
			card.x = 138 / 2 - card.width / 2 + i * 138;
			card.y = 248 / 2 - card.height / 2;
			this.g_common.addChild(card);
			this.boardsUI.push(card);
		}
		this.players = [];
		for (var i = 0; i < CardsData.ins.players.length; i++) {
			var player = new PlayerUI(i);
			player.x = 30;
			player.y = i * 298;
			this.g_playerList.addChild(player);
			this.players.push(player);
		}
	}

	private addEvent() {
		this.btn_calculate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.isStart, this);
		this.btn_clear.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clear, this);
		this.btn_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addPlayer, this);
		this.btn_switch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switchOmaha, this);
	}

	private addPlayer() {
		CardsData.ins.addPlayer();
		var player = new PlayerUI(CardsData.ins.players.length - 1);
		player.x = 30;
		player.y = (CardsData.ins.players.length - 1) * 298;
		this.g_playerList.addChild(player);
		this.players.push(player);
		this.g_playerList.height += 298;
		for (var i = 0; i < this.players.length; i++) {
			this.players[i].btn_close.visible = true;
		}
		this.resetLabel();
		// this.g_scroller.verticalScrollBar.autoVisibility = false;
	}

	public deletePlayer(index) {
		if (CardsData.ins.players.length == 2) {
			return;
		}
		CardsData.ins.playerNumber--;
		ChooseCardPage.ins.resetRemovePlayerCard(CardsData.ins.players[index].cards);
		CardsData.ins.players.splice(index, 1);
		this.g_playerList.removeChild(this.players[index]);
		this.players.splice(index, 1);
		this.g_playerList.height -= 298;
		for (var i = 0; i < this.players.length; i++) {
			if (i >= index) {
				this.players[i].y -= 298;
				this.players[i].playerIndex = i;
			}
		}
		this.resetLabel();
		if (this.players.length == 2) {
			for (var i = 0; i < this.players.length; i++) {
				this.players[i].btn_close.visible = false;
			}
		}
		// 删除玩家的时候要把刚刚选的牌给清空，不然再进去没得选
	}

	private isStart() {
		var handCardsNum = this.gameType == GameType.NLH ? 2 : 4;
		for (var i = 0; i < this.players.length; i++) {
			for (var j = 0; j < handCardsNum; j++) {
				if (CardsData.ins.players[i].cards[j].code == 0) {
					alert('请输入完整牌局');
					return;
				}
			}
		}
		CardTypeUtil.ins.startCalculator();
	}

	private clear() {
		for (var i = 0; i < 5; i++) {
			this.boardsUI[i].resetCards();
		}
		for (var i = 0; i < this.players.length; i++) {
			for (var j = 0; j < this.players[i].cards.length; j++) {
				this.players[i].cards[j].resetCards();
			}
		}
		CardsData.ins.initCards();
		ChooseCardPage.ins.resetAllChooseCards();
		this.resetLabel();
	}

	public setActiveCards(card: CardObject) {
		for (var i = 0; i < 5; i++) {
			if (this.boardsUI[i].isActiveCard) {
				this.boardsUI[i].setCardData(card.color, card.value);
				this.boardsUI[i].isActiveCard = false;
				CardsData.ins.boards[i].code = card.code;
				CardsData.ins.boards[i].value = card.value;
				CardsData.ins.boards[i].color = card.color;
				this.resetLabel();
				return;
			}
		}
		for (var i = 0; i < this.players.length; i++) {
			for (var j = 0; j < this.players[i].cards.length; j++) {
				if (this.players[i].cards[j].isActiveCard) {
					this.players[i].cards[j].setCardData(card.color, card.value);
					this.players[i].cards[j].isActiveCard = false;
					CardsData.ins.players[i].cards[j].code = card.code;
					CardsData.ins.players[i].cards[j].value = card.value;
					CardsData.ins.players[i].cards[j].color = card.color;
					this.resetLabel();
					return;
				}
			}
		}
	}

	public resetActiveCard() {
		for (var i = 0; i < this.boardsUI.length; i++) {
			if (this.boardsUI[i].card.code == CardsData.ins.activeCard.code) {
				this.boardsUI[i].resetCards();
				CardsData.ins.boards[i].resetCard();
				return;
			}
		}
		for (var i = 0; i < this.players.length; i++) {
			for (var j = 0; j < this.players[i].cards.length; j++) {
				if (this.players[i].cards[j].card.code == CardsData.ins.activeCard.code) {
					this.players[i].cards[j].resetCards();
					CardsData.ins.players[i].cards[j].resetCard();
					return;
				}
			}
		}
	}

	public showResult() {
		for (var i = 0; i < CardsData.ins.players.length; i++) {
			var label = i + 1 + "号\n胜率：\n" + CardsData.ins.players[i].winProbability;
			this.players[i].setLabel(label);
		}
	}

	private resetLabel() {
		for (var i = 0; i < CardsData.ins.players.length; i++) {
			this.players[i].setLabel(i + 1 + "号\n胜率：?");
		}
	}

	private switchOmaha() {
		this.gameType = this.gameType == GameType.NLH ? GameType.OMAHA : GameType.NLH;
		this.clear();
		this.switchInit();
		HomePage.ins.initHomePage();
	}

	private switchInit() {
		for (var i = this.g_playerList.numChildren; i > 1; i--) {
			this.g_playerList.removeChildAt(i - 1);
		}
		this.g_common.removeChildren();
		this.btn_add.y = 594;
	}
}