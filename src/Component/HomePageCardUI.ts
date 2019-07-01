class HomePageCardUI extends eui.Component implements eui.UIComponent {
	public constructor(color?: number, value?: number, isPlayerCards?: boolean) {
		super();
		this.skinName = CardUISkin;
		this.initCard(color, value, isPlayerCards);
		this.addEvent();
	}

	private cardLabel: eui.Label;
	public isActiveCard: boolean = false;
	public card: CardObject = new CardObject;
	private rectMask: eui.Rect;
	private isPlayerCards: boolean;

	private initCard(color?: number, value?: number, isPlayerCards?: boolean) {
		// 主页的牌不需要遮罩
		this.rectMask.visible = false;
		this.isPlayerCards = isPlayerCards;
		this.setCardData(color, value);
	}

	public setCardData(color?: number, value?: number) {
		this.card.color = color ? color : undefined;
		this.card.value = value ? value : undefined;
		this.card.code = value && color ? color * 256 + value : undefined;
		this.cardLabel.text = this.card.code ? CardsData.ins.cardValues[value - 2] + "\n" + CardsData.ins.cardColors[color - 1] : "?";
		this.cardLabel.textColor = color == 1 || color == 3 ? 0xFC1000 : 0x000000;
	}

	private addEvent() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
			this.isActiveCard = true;
			CardsData.ins.activeCard = new CardObject;
			CardsData.ins.activeCard.code = this.card.code;
			CardsData.ins.activeCard.value = this.card.value;
			CardsData.ins.activeCard.color = this.card.color;
			this.showChooseUI();
		}, this)
	}

	private showChooseUI() {

		LayerManager.addBaseLayer(ChooseCardPage.ins);
		LayerManager.removeBaseLayer(HomePage.ins);

	}

	public resetCards() {
		this.cardLabel.textColor = 0x000000;
		this.cardLabel.text = "?";
		this.isActiveCard = false;
	}
}