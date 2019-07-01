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
var ChooseCardPage = (function (_super) {
    __extends(ChooseCardPage, _super);
    function ChooseCardPage() {
        var _this = _super.call(this) || this;
        _this.cardsGroups = [];
        _this.allChooseCards = [];
        _this.skinName = ChooseCardPageSkin;
        _this.initPage();
        _this.addEvent();
        ChooseCardPage.ins = _this;
        return _this;
    }
    ChooseCardPage.prototype.addEvent = function () {
        this.btn_noChoose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.noChooseCard, this);
        this.btn_goBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goBackHome, this);
    };
    ChooseCardPage.prototype.noChooseCard = function () {
        HomePage.ins.resetActiveCard();
        if (CardsData.ins.activeCard.code) {
            this.resetLastSelectedCards();
        }
        this.goBackHome();
    };
    ChooseCardPage.prototype.goBackHome = function () {
        LayerManager.removeBaseLayer(ChooseCardPage.ins);
        LayerManager.addBaseLayer(HomePage.ins);
    };
    ChooseCardPage.prototype.initPage = function () {
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
    };
    ChooseCardPage.prototype.initGroupCards = function () {
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
    };
    ChooseCardPage.prototype.resetLastSelectedCards = function () {
        for (var i = 0; i < this.allChooseCards.length; i++) {
            if (this.allChooseCards[i].card.code == CardsData.ins.activeCard.code) {
                this.allChooseCards[i].setCardsState(false);
            }
        }
        CardsData.ins.activeCard.resetCard();
        CardsData.ins.activeCard = null;
    };
    ChooseCardPage.prototype.resetAllChooseCards = function () {
        for (var i = 0; i < this.allChooseCards.length; i++) {
            this.allChooseCards[i].setCardsState(false);
        }
    };
    ChooseCardPage.prototype.resetRemovePlayerCard = function (cards) {
        var _this = this;
        cards.map(function (playerCard) {
            _this.allChooseCards.map(function (chooseCardUI) {
                if (chooseCardUI.card.code == playerCard.code) {
                    chooseCardUI.setCardsState(false);
                }
            });
        });
    };
    return ChooseCardPage;
}(ViewBase));
__reflect(ChooseCardPage.prototype, "ChooseCardPage");
//# sourceMappingURL=ChooseCardPage.js.map