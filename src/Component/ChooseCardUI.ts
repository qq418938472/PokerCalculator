class ChooseCardUI extends eui.Component implements eui.UIComponent {
	public constructor(color?: number, value?: number, isHomePageCard?: boolean) {
		super();
		this.skinName = CardUISkin;
		this.initCard(color, value, isHomePageCard);
		this.addEvent();
	}
	private cardLabel: eui.Label;
	public isSelected: boolean = false;
	public card: CardObject = new CardObject;
	private rectMask: eui.Rect;

	private initCard(color?: number, value?: number, isHomePageCard?: boolean) {
		this.rectMask.visible = false;
		this.card.color = color ? color : undefined;
		this.card.value = value ? value : undefined;
		this.card.code = color * 256 + value;
		this.cardLabel.text = this.card.code ? CardsData.ins.cardValues[value - 2] + "\n" + CardsData.ins.cardColors[color - 1] : "?";
		this.cardLabel.textColor = color == 1 || color == 3 ? 0xFC1000 : 0x000000;
	}

	private addEvent() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
			if (this.isSelected) {
				return;
			}
			this.setCardsState(true);
			if (CardsData.ins.activeCard.code) {
				ChooseCardPage.ins.resetLastSelectedCards();
			}
			this.showHomePage();
		}, this)
	}

	public setCardsState(isSelected: boolean) {
		this.isSelected = isSelected;
		this.rectMask.visible = isSelected;
	}

	private showHomePage() {
		CardsData.ins.setBoards(this.card);
		HomePage.ins.setActiveCards(this.card);
		LayerManager.removeBaseLayer(ChooseCardPage.ins);
		LayerManager.addBaseLayer(HomePage.ins);
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
	}
}