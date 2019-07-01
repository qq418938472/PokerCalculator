class PlayerUI extends eui.Component implements eui.UIComponent {
	public constructor(index: number) {
		super();
		this.skinName = PlayerUISkin;
		this.playerIndex = index;
		this.initPlayer();
	}

	private g_cards: eui.Group;
	public cards: Array<HomePageCardUI>;
	public lab_result: eui.Label;
	public btn_close: eui.Button;
	public playerIndex: number;
	private initPlayer() {
		this.lab_result.text = this.playerIndex + 1 + "号\n胜率：?";
		this.cards = [];
		var cardNum = HomePage.ins.gameType == GameType.NLH ? 2 : 5;
		for (var i = 0; i < cardNum; i++) {
			var card = new HomePageCardUI(undefined, undefined, true);
			card.x = 24 + i * 103;
			card.y = 37;
			this.cards.push(card);
			this.g_cards.addChild(card);
		}
		this.btn_close.visible = false;
		this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.deletaPlayer, this);
	}

	private deletaPlayer() {
		HomePage.ins.deletePlayer(this.playerIndex);
	}

	public setLabel(text) {
		this.lab_result.text = text;
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
	}

}