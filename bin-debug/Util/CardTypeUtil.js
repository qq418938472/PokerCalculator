var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CardTypeUtil = (function () {
    function CardTypeUtil() {
        this.maxPower = 0;
        this.tempPlayerList = new Array;
        this.type_royal_flush = 10;
        this.type_straight_flush = 9;
        this.type_four_kind = 8;
        this.type_full_house = 7;
        this.type_flush = 6;
        this.type_straight = 5;
        this.type_three_kind = 4;
        this.type_two_pairs = 3;
        this.type_one_pair = 2;
        this.type_hight_card = 1;
    }
    CardTypeUtil.prototype.startCalculator = function () {
        this.resetPlayers();
        this.initCalcList();
        this.setRemainingCards();
        this.disorderRemainingCards();
        SetRemainingBoards.ins.setTable();
        this.setWinNumber();
        HomePage.ins.showResult();
    };
    CardTypeUtil.prototype.initCalcList = function () {
        this.calcList = [];
        var cardNum = HomePage.ins.gameType == GameType.NLH ? 7 : 5;
        for (var i = 0; i < cardNum; i++) {
            var card = new CardObject;
            this.calcList.push(card);
        }
    };
    CardTypeUtil.prototype.resetPlayers = function () {
        CardsData.ins.players.map(function (player) {
            player.resetPlayer();
        });
    };
    CardTypeUtil.prototype.setRemainingCards = function () {
        var _this = this;
        this.allCards = [];
        this.selectedCards = [];
        this.remainingCards = [];
        this.remainingCardsObj = [];
        this.selectedBoardsNum = 0;
        CardsData.ins.allChooseCards.map(function (card) {
            _this.allCards.push(card.code);
        });
        CardsData.ins.boards.map(function (card, index) {
            if (card.code) {
                _this.selectedCards.push(card.code);
                _this.selectedBoardsNum++;
                _this.calcList[index] = _this.createCard(card.code);
            }
        });
        CardsData.ins.players.map(function (player) {
            player.cards.map(function (card) {
                _this.selectedCards.push(card.code);
            });
        });
        this.allCards.map(function (card) {
            if (_this.selectedCards.indexOf(card) == -1) {
                _this.remainingCards.push(card);
            }
        });
    };
    CardTypeUtil.prototype.disorderRemainingCards = function () {
        var code;
        var cards = this.remainingCards.slice(0);
        for (var i = cards.length; i > 0; i--) {
            // 产生随机数
            var num = Math.floor(Math.random() * cards.length);
            code = cards.splice(num, 1);
            this.remainingCardsObj.push(this.createCard(code[0]));
        }
    };
    // private setWinNumber() {
    // 	var calcTimes = 1;
    // 	SetRemainingBoards.ins.reset();
    // 	var setPlayerDataFunc = HomePage.ins.gameType == GameType.NLH ? this.nlhSetPlayerData : this.omahaSetPlayerData;
    // 	this.reset();
    // 	if (this.selectedBoardsNum < 5) {
    // 		SetRemainingBoards.ins.getBoardsFunc.call(SetRemainingBoards.ins);
    // 	}
    // 	console.log('公共牌', CardTypeUtil.ins.calcList);
    // 	setPlayerDataFunc.call(this);
    // 	this.updateWins();
    // 	for (var i = 0; i < CardsData.ins.players.length; i++) {
    // 		CardsData.ins.players[i].winProbability = (CardsData.ins.players[i].winNumber / 1 * 100).toFixed(2) + "%";
    // 	}
    // 	console.log('计算最后得到的玩家数据', CardsData.ins.players);
    // }
    CardTypeUtil.prototype.setWinNumber = function () {
        var startTime = egret.getTimer();
        var calcTimes = 3000;
        SetRemainingBoards.ins.reset();
        var setPlayerDataFunc = HomePage.ins.gameType == GameType.NLH ? this.nlhSetPlayerData : this.omahaSetPlayerData;
        for (var i = 1; i <= calcTimes; i++) {
            if (i % 3000 == 0) {
                SetRemainingBoards.ins.reset();
            }
            this.reset();
            if (this.selectedBoardsNum < 5) {
                SetRemainingBoards.ins.getBoardsFunc.call(SetRemainingBoards.ins);
            }
            setPlayerDataFunc.call(this);
            this.updateWins();
        }
        var endTime = egret.getTimer();
        console.log('开始计算总时间', endTime - startTime);
        egret.log(endTime - startTime);
        for (var i = 0; i < CardsData.ins.players.length; i++) {
            CardsData.ins.players[i].winProbability = (CardsData.ins.players[i].winNumber / calcTimes * 100).toFixed(2) + "%";
        }
        console.log('计算最后得到的玩家数据', CardsData.ins.players);
        HomePage.ins.lab_tips.text = '计算时长:' + (endTime - startTime) + 'ms';
    };
    // 找出赢得玩家并++
    CardTypeUtil.prototype.nlhSetPlayerData = function () {
        for (var i = 0; i < CardsData.ins.players.length; i++) {
            this.calcList[5] = CardsData.ins.players[i].cards[0];
            this.calcList[6] = CardsData.ins.players[i].cards[1];
            CardsData.ins.players[i].cardPower = SetCardPower.ins.initCardPower(this.calcList);
            this.addMaxPower(CardsData.ins.players[i].cardPower, CardsData.ins.players[i]);
        }
    };
    CardTypeUtil.prototype.omahaSetPlayerData = function () {
        for (var i = 0; i < CardsData.ins.players.length; i++) {
            // 切换出5张手牌来，取出最大的值
            CardsData.ins.players[i].cardPower = SetOmahaCardPower.ins.initCardPower(CardsData.ins.players[i].cards, this.calcList);
            this.addMaxPower(CardsData.ins.players[i].cardPower, CardsData.ins.players[i]);
        }
    };
    CardTypeUtil.prototype.reset = function () {
        this.maxPower = Number.MIN_VALUE;
        this.count = 0;
    };
    CardTypeUtil.prototype.addMaxPower = function (p, player) {
        if (p > this.maxPower) {
            this.maxPower = p;
            this.tempPlayerList[0] = player;
            this.count = 1;
        }
        else if (p == this.maxPower) {
            this.tempPlayerList[this.count] = player;
            this.count++;
        }
    };
    CardTypeUtil.prototype.updateWins = function () {
        var win = Math.floor(1 / this.count * 10000) / 10000;
        for (var i = 0; i < this.count; i++) {
            this.tempPlayerList[i].winNumber += win;
        }
    };
    CardTypeUtil.prototype.createCards = function (com) {
        var cards = new Array;
        for (var i = 0; i < com.length; i++) {
            cards.push(this.createLine(com[i]));
        }
        return cards;
    };
    CardTypeUtil.prototype.createLine = function (arr) {
        var cardLine = new Array;
        for (var i = 0; i < arr.length; i++) {
            cardLine.push(this.createCard(arr[i]));
        }
        cardLine.sort(this.sortCard);
        return cardLine;
    };
    CardTypeUtil.prototype.sortCard = function (a, b) {
        return b.value - a.value;
    };
    CardTypeUtil.prototype.createCard = function (code) {
        var obj = new CardObject;
        obj.code = code;
        obj.value = Math.floor(code % 256);
        obj.color = Math.floor(code / 256);
        return obj;
    };
    CardTypeUtil.ins = new CardTypeUtil;
    return CardTypeUtil;
}());
__reflect(CardTypeUtil.prototype, "CardTypeUtil");
//# sourceMappingURL=CardTypeUtil.js.map