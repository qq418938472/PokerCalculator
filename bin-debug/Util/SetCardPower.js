var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SetCardPower = (function () {
    function SetCardPower() {
        // 用4个值代表4个花色下的所有牌信息
        this.cardCodes = new Array;
        this.table = new CardEvaluationTables;
    }
    SetCardPower.prototype.initCardPower = function (cards) {
        this.changeCardsCode(cards);
        return this.setCardPower();
    };
    SetCardPower.prototype.changeCardsCode = function (cards) {
        this.cardCodes[0] = 0;
        this.cardCodes[1] = 0;
        this.cardCodes[2] = 0;
        this.cardCodes[3] = 0;
        for (var i = 0; i < cards.length; i++) {
            this.cardCodes[cards[i].color - 1] |= (1 << (cards[i].value - 2));
        }
    };
    SetCardPower.prototype.setCardPower = function () {
        var VSHIFT = 24;
        var MAJOR_SHIFT = 20;
        var MINOR_SHIFT = 16;
        var diamondVal = 0;
        var clubVal = 1;
        var heartVal = 2;
        var spadeVal = 3;
        // d方块，c梅花，h红心，s黑桃
        var d = this.cardCodes[0];
        var c = this.cardCodes[1];
        var h = this.cardCodes[2];
        var s = this.cardCodes[3];
        var rankmask = d | c | h | s;
        if (this.table.nRanksTable[rankmask] >= 5) {
            var sranks = -1;
            var suitIndex = -1;
            if (this.table.nRanksTable[d] >= 5) {
                suitIndex = diamondVal;
                sranks = d;
            }
            else if (this.table.nRanksTable[c] >= 5) {
                suitIndex = clubVal;
                sranks = c;
            }
            else if (this.table.nRanksTable[h] >= 5) {
                suitIndex = heartVal;
                sranks = h;
            }
            else if (this.table.nRanksTable[s] >= 5) {
                suitIndex = spadeVal;
                sranks = s;
            }
            if (sranks >= 0) {
                var strval = this.table.straightTable[sranks];
                if (strval > 0) {
                    //皇同或同花顺，strval是最小顺子A2345特殊判断
                    var mapCodes = strval == 3 ? 4111 : this.table.topFiveRanksTable[(1 << strval + 1) - 1];
                    var typePower = this.table.topRankTable[sranks] == 12
                        ? CardTypeUtil.ins.type_royal_flush : CardTypeUtil.ins.type_straight_flush;
                    return (typePower << VSHIFT ^ strval << MAJOR_SHIFT);
                }
                else {
                    // 同花
                    return (CardTypeUtil.ins.type_flush << VSHIFT ^ this.table.topFiveRanksTable[sranks]);
                }
            }
            // 顺子
            var strval = this.table.straightTable[rankmask];
            if (strval > 0) {
                var mapCodes = strval == 3 ? 4111 : this.table.topFiveRanksTable[(1 << strval + 1) - 1];
                return (CardTypeUtil.ins.type_straight << VSHIFT ^ strval << MAJOR_SHIFT);
            }
        }
        // 所有牌
        var ncards = this.table.nRanksTable[c]
            + this.table.nRanksTable[d]
            + this.table.nRanksTable[h]
            + this.table.nRanksTable[s];
        var ndups = ncards - this.table.nRanksTable[rankmask];
        switch (ndups) {
            // no pair
            case 0:
                return (CardTypeUtil.ins.type_hight_card << VSHIFT ^ this.table.topFiveRanksTable[rankmask]);
            // one pair
            case 1:
                var two_mask = rankmask ^ (c ^ d ^ h ^ s);
                var topind = this.table.topRankTable[two_mask];
                var kickers = this.table.topThreeRanksTable[rankmask ^ 1 << topind];
                return (CardTypeUtil.ins.type_one_pair << VSHIFT ^ topind << MAJOR_SHIFT ^ kickers);
            case 2: {
                var two_mask = rankmask ^ (c ^ d ^ h ^ s);
                //2对和3条
                if (two_mask) {
                    var topind = this.table.topRankTable[two_mask];
                    var botind = this.table.topRankTable[two_mask ^ 1 << topind];
                    var kicker = this.table.topRankTable[rankmask ^ two_mask];
                    return (CardTypeUtil.ins.type_two_pairs << VSHIFT) ^
                        (topind << MAJOR_SHIFT) ^ (botind << MINOR_SHIFT) ^ (1 << kicker);
                }
                else {
                    var three_mask = ((c & d) | (h & s)) & ((c & h) | (d & s));
                    var topind = this.table.topRankTable[three_mask];
                    var kickers = rankmask ^ (1 << topind);
                    var kbits = 1 << this.table.topRankTable[kickers];
                    kbits ^= 1 << this.table.topRankTable[kickers ^ kbits];
                    return (CardTypeUtil.ins.type_three_kind << VSHIFT) ^
                        (topind << MAJOR_SHIFT) ^ kbits;
                }
            }
            default: {
                //金刚
                var four_mask = c & d & h & s;
                if (four_mask) {
                    var topind = this.table.topRankTable[four_mask];
                    var kicker = this.table.topRankTable[rankmask ^= 1 << topind];
                    return (CardTypeUtil.ins.type_four_kind << VSHIFT) ^
                        (topind << MAJOR_SHIFT) ^ (1 << kicker);
                }
                var two_mask = rankmask ^ (c ^ d ^ h ^ s);
                // 葫芦
                if (this.table.nRanksTable[two_mask] != ndups) {
                    var three_mask = ((c & d) | (h & s)) & ((c & h) | (d & s));
                    var topind = this.table.topRankTable[three_mask];
                    if (two_mask > 0) {
                        var botind = this.table.topRankTable[two_mask];
                        return (CardTypeUtil.ins.type_full_house << VSHIFT) ^
                            (topind << MAJOR_SHIFT) ^ (botind << MINOR_SHIFT);
                    }
                    else {
                        var botind = this.table.topRankTable[three_mask ^ 1 << topind];
                        return (CardTypeUtil.ins.type_full_house << VSHIFT) ^
                            (topind << MAJOR_SHIFT) ^ (botind << MINOR_SHIFT);
                    }
                }
                // 3对子+1
                var topind = this.table.topRankTable[two_mask];
                var botind = this.table.topRankTable[two_mask ^ 1 << topind];
                var kicker = rankmask ^ 1 << topind ^ 1 << botind;
                kicker = this.table.topRankTable[kicker];
                if (kicker >= 0) {
                    return (CardTypeUtil.ins.type_two_pairs << VSHIFT) ^ (topind << MAJOR_SHIFT) ^
                        (botind << MINOR_SHIFT) ^ (1 << kicker);
                }
                else {
                    return (CardTypeUtil.ins.type_two_pairs << VSHIFT) ^ (topind << MAJOR_SHIFT) ^
                        (botind << MINOR_SHIFT);
                }
            }
        }
    };
    SetCardPower.ins = new SetCardPower;
    return SetCardPower;
}());
__reflect(SetCardPower.prototype, "SetCardPower");
//# sourceMappingURL=SetCardPower.js.map