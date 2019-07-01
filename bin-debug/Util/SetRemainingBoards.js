var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SetRemainingBoards = (function () {
    function SetRemainingBoards() {
        this.table = new Array;
        this.nlhTables = new NlhRemainingCardsIndexTables;
        this.omahaTables = new OmahaRemainingCardsIndexTables;
        this.curIndex = 0;
    }
    SetRemainingBoards.prototype.reset = function () {
        this.curIndex = 0;
    };
    SetRemainingBoards.prototype.setTable = function () {
        var needBoardsNum = 5 - CardTypeUtil.ins.selectedBoardsNum;
        if (needBoardsNum != 0) {
            var tableName = CardsData.ins.players.length + "_" + needBoardsNum;
            var handlength = CardsData.ins.players[0].getPlayerCardsLength();
            if (HomePage.ins.gameType == GameType.NLH) {
                this.table = this.nlhTables.map[tableName];
            }
            else {
                this.table = this.omahaTables.map[handlength + "_" + tableName];
            }
            if (needBoardsNum == 5) {
                this.getBoardsFunc = this.getFiveCards;
            }
            else if (needBoardsNum == 2) {
                this.getBoardsFunc = this.getTwoCards;
            }
            else {
                this.getBoardsFunc = this.getOneCards;
            }
        }
    };
    SetRemainingBoards.prototype.getFiveCards = function () {
        this.getNextEle();
        CardTypeUtil.ins.calcList[0] = this.tempCard;
        this.getNextEle();
        CardTypeUtil.ins.calcList[1] = this.tempCard;
        this.getNextEle();
        CardTypeUtil.ins.calcList[2] = this.tempCard;
        this.getNextEle();
        CardTypeUtil.ins.calcList[3] = this.tempCard;
        this.getNextEle();
        CardTypeUtil.ins.calcList[4] = this.tempCard;
    };
    SetRemainingBoards.prototype.getTwoCards = function () {
        this.getNextEle();
        CardTypeUtil.ins.calcList[3] = this.tempCard;
        this.getNextEle();
        CardTypeUtil.ins.calcList[4] = this.tempCard;
    };
    SetRemainingBoards.prototype.getOneCards = function () {
        this.getNextEle();
        CardTypeUtil.ins.calcList[4] = this.tempCard;
    };
    SetRemainingBoards.prototype.getNextEle = function () {
        this.tempCard = CardTypeUtil.ins.remainingCardsObj[this.table[this.curIndex]];
        this.curIndex++;
    };
    SetRemainingBoards.ins = new SetRemainingBoards;
    return SetRemainingBoards;
}());
__reflect(SetRemainingBoards.prototype, "SetRemainingBoards");
//# sourceMappingURL=SetRemainingBoards.js.map