var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CardObject = (function () {
    function CardObject() {
        this.value = 0;
        this.color = 0;
        this.code = 0;
    }
    CardObject.prototype.resetCard = function () {
        this.value = 0;
        this.color = 0;
        this.code = 0;
    };
    return CardObject;
}());
__reflect(CardObject.prototype, "CardObject");
//# sourceMappingURL=CardObject.js.map