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
var ChooseCardUI = (function (_super) {
    __extends(ChooseCardUI, _super);
    function ChooseCardUI(color, value, isHomePageCard) {
        var _this = _super.call(this) || this;
        _this.isSelected = false;
        _this.card = new CardObject;
        _this.skinName = CardUISkin;
        _this.initCard(color, value, isHomePageCard);
        _this.addEvent();
        return _this;
    }
    ChooseCardUI.prototype.initCard = function (color, value, isHomePageCard) {
        this.rectMask.visible = false;
        this.card.color = color ? color : undefined;
        this.card.value = value ? value : undefined;
        this.card.code = color * 256 + value;
        this.cardLabel.text = this.card.code ? CardsData.ins.cardValues[value - 2] + "\n" + CardsData.ins.cardColors[color - 1] : "?";
        this.cardLabel.textColor = color == 1 || color == 3 ? 0xFC1000 : 0x000000;
    };
    ChooseCardUI.prototype.addEvent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (this.isSelected) {
                return;
            }
            this.setCardsState(true);
            if (CardsData.ins.activeCard.code) {
                ChooseCardPage.ins.resetLastSelectedCards();
            }
            this.showHomePage();
        }, this);
    };
    ChooseCardUI.prototype.setCardsState = function (isSelected) {
        this.isSelected = isSelected;
        this.rectMask.visible = isSelected;
    };
    ChooseCardUI.prototype.showHomePage = function () {
        CardsData.ins.setBoards(this.card);
        HomePage.ins.setActiveCards(this.card);
        LayerManager.removeBaseLayer(ChooseCardPage.ins);
        LayerManager.addBaseLayer(HomePage.ins);
    };
    ChooseCardUI.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    ChooseCardUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return ChooseCardUI;
}(eui.Component));
__reflect(ChooseCardUI.prototype, "ChooseCardUI", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=ChooseCardUI.js.map