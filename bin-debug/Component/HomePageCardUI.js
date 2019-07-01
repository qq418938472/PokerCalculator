var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var HomePageCardUI = (function (_super) {
    __extends(HomePageCardUI, _super);
    function HomePageCardUI(color, value, isPlayerCards) {
        var _this = _super.call(this) || this;
        _this.isActiveCard = false;
        _this.card = new CardObject;
        _this.skinName = CardUISkin;
        _this.initCard(color, value, isPlayerCards);
        _this.addEvent();
        return _this;
    }
    HomePageCardUI.prototype.initCard = function (color, value, isPlayerCards) {
        // 主页的牌不需要遮罩
        this.rectMask.visible = false;
        this.isPlayerCards = isPlayerCards;
        this.setCardData(color, value);
    };
    HomePageCardUI.prototype.setCardData = function (color, value) {
        this.card.color = color ? color : undefined;
        this.card.value = value ? value : undefined;
        this.card.code = value && color ? color * 256 + value : undefined;
        this.cardLabel.text = this.card.code ? CardsData.ins.cardValues[value - 2] + "\n" + CardsData.ins.cardColors[color - 1] : "?";
        this.cardLabel.textColor = color == 1 || color == 3 ? 0xFC1000 : 0x000000;
    };
    HomePageCardUI.prototype.addEvent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.isActiveCard = true;
            CardsData.ins.activeCard = new CardObject;
            CardsData.ins.activeCard.code = this.card.code;
            CardsData.ins.activeCard.value = this.card.value;
            CardsData.ins.activeCard.color = this.card.color;
            this.showChooseUI();
        }, this);
    };
    HomePageCardUI.prototype.showChooseUI = function () {
        LayerManager.addBaseLayer(ChooseCardPage.ins);
        LayerManager.removeBaseLayer(HomePage.ins);
    };
    HomePageCardUI.prototype.resetCards = function () {
        this.cardLabel.textColor = 0x000000;
        this.cardLabel.text = "?";
        this.isActiveCard = false;
    };
    return HomePageCardUI;
}(eui.Component));
__reflect(HomePageCardUI.prototype, "HomePageCardUI", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=HomePageCardUI.js.map