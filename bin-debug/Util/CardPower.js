var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CardPower = (function () {
    function CardPower() {
        this.typePower = 0;
        this.cardPower = 0;
    }
    return CardPower;
}());
__reflect(CardPower.prototype, "CardPower");
//# sourceMappingURL=CardPower.js.map