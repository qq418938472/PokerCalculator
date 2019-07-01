class CardObject {
	public value: number = 0;
	public color: number = 0;
	public code: number = 0;
	public isActive: boolean;
	public isHomePage: boolean;

	public resetCard() {
		this.value = 0;
		this.color = 0;
		this.code = 0;
	}
}