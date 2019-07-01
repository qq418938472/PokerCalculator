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
var PlayerUI = (function (_super) {
    __extends(PlayerUI, _super);
    function PlayerUI(index) {
        var _this = _super.call(this) || this;
        _this.skinName = PlayerUISkin;
        _this.playerIndex = index;
        _this.initPlayer();
        return _this;
    }
    PlayerUI.prototype.initPlayer = function () {
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
    };
    PlayerUI.prototype.deletaPlayer = function () {
        HomePage.ins.deletePlayer(this.playerIndex);
    };
    PlayerUI.prototype.setLabel = function (text) {
        this.lab_result.text = text;
    };
    PlayerUI.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    PlayerUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return PlayerUI;
}(eui.Component));
__reflect(PlayerUI.prototype, "PlayerUI", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=PlayerUI.js.map