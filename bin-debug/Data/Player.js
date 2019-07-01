var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Player = (function () {
    function Player() {
        this.playerInit();
    }
    Player.prototype.playerInit = function () {
        this.cards = new Array;
        this.winNumber = 0;
        this.winProbability = "";
    };
    Player.prototype.resetPlayer = function () {
        this.winNumber = 0;
        this.winProbability = "";
    };
    Player.prototype.getPlayerCardsLength = function () {
        var num = 0;
        for (var i = 0; i < this.cards.length; i++) {
            if (this.cards[i].code != 0) {
                num++;
            }
        }
        return num;
    };
    return Player;
}());
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map