class ChooseCardPage extends ViewBase {
	public constructor() {
		super();
		this.skinName = ChooseCardPageSkin;
		this.initPage();
		this.addEvent();
		ChooseCardPage.ins = this;
	}

	private addEvent() {
		this.btn_noChoose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.noChooseCard, this);
		this.btn_goBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goBackHome, this);
	}

	private noChooseCard() {
		HomePage.ins.resetActiveCard();
		if (CardsData.ins.activeCard.code) {
			this.resetLastSelectedCards();
		}
		this.goBackHome();
	}

	private goBackHome() {
		LayerManager.removeBaseLayer(ChooseCardPage.ins);
		LayerManager.addBaseLayer(HomePage.ins);
	}

	private btn_noChoose: eui.Button;
	private btn_goBack: eui.Button;
	public static ins: ChooseCardPage;
	private cardsGroups: Array<eui.Group> = [];
	private allChooseCards: Array<ChooseCardUI> = [];
	private initPage() {
		for (var i = 0; i < 4; i++) {
			var group = new eui.Group();
			group.width = 715;
			group.height = 290;
			group.x = 17;
			group.y = 25 + i * 300;
			this.cardsGroups.push(group);
			this.addChild(group);
		}
		this.initGroupCards();
	}

	private initGroupCards() {
		for (var i = 0; i < 4; i++) {
			var group = this.cardsGroups[i];
			for (var j = 0; j < 13; j++) {
				var cardData = CardsData.ins.allChooseCards[i * 13 + j];
				var card = new ChooseCardUI(cardData.color, cardData.value, false);
				card.x = 20 + (j % 7) * 100;
				card.y = Math.floor(j / 7) * 145 + 10;
				group.addChild(card);
				this.allChooseCards.push(card);
			}
		}
	}

	public resetLastSelectedCards() {
		for (var i = 0; i < this.allChooseCards.length; i++) {
			if (this.allChooseCards[i].card.code == CardsData.ins.activeCard.code) {
				this.allChooseCards[i].setCardsState(false);
			}
		}
		CardsData.ins.activeCard.resetCard();
		CardsData.ins.activeCard = null;
	}

	public resetAllChooseCards() {
		for (var i = 0; i < this.allChooseCards.length; i++) {
			this.allChooseCards[i].setCardsState(false);
		}
	}

	public resetRemovePlayerCard(cards: Array<CardObject>) {
		cards.map(playerCard => {
			this.allChooseCards.map(chooseCardUI => {
				if (chooseCardUI.card.code == playerCard.code) {
					chooseCardUI.setCardsState(false);
				}
			})
		})
	}
}