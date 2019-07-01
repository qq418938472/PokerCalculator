class SetOmahaCardPower {
	// 用4个值代表4个花色下的所有牌信息
	public static ins: SetOmahaCardPower = new SetOmahaCardPower;
	private cardCodes: Array<number> = new Array;
	private handCodes: Array<number> = new Array;
	private handRankMask: number;
	private boardsCodes: Array<number> = new Array;
	private boardsRankMask: number;
	private table: CardEvaluationTables = new CardEvaluationTables;
	private VSHIFT = 24;
	private MAJOR_SHIFT = 20;
	private MINOR_SHIFT = 16;
	private flushRankMask: Array<number> = new Array;
	private flushRanks: number;

	public initCardPower(handCards: Array<CardObject>, boards: Array<CardObject>) {
		this.changeCardsCode(handCards, this.handCodes);
		this.changeCardsCode(boards, this.boardsCodes);
		this.setAllCardCodes();
		return this.setCardPower();
	}

	private changeCardsCode(cards: Array<CardObject>, cardCodes: Array<number>) {
		cardCodes[0] = 0;
		cardCodes[1] = 0;
		cardCodes[2] = 0;
		cardCodes[3] = 0;
		for (var i = 0; i < cards.length; i++) {
			cardCodes[cards[i].color - 1] |= (0b1 << (cards[i].value - 2));
		}
	}

	//把手牌以及公共牌拼接起来
	private setAllCardCodes() {
		this.cardCodes[0] = 0;
		this.cardCodes[1] = 0;
		this.cardCodes[2] = 0;
		this.cardCodes[3] = 0;
		this.handRankMask = 0;
		this.boardsRankMask = 0;
		for (var i = 0; i < this.cardCodes.length; i++) {
			this.cardCodes[i] |= this.handCodes[i];
			this.cardCodes[i] |= this.boardsCodes[i];
			this.handRankMask |= this.handCodes[i];
			this.boardsRankMask |= this.boardsCodes[i];
		}
	}

	private setCardPower(): number {
		// d方块，c梅花，h红心，s黑桃
		var d: number = this.cardCodes[0];
		var c: number = this.cardCodes[1];
		var h: number = this.cardCodes[2];
		var s: number = this.cardCodes[3];
		var rankmask = d | c | h | s;
		var four_mask = d & c & h & s;
		var three_four_mask = ((c & d) | (h & s)) & ((c & h) | (d & s));
		if (this.table.nRanksTable[rankmask] >= 5) {
			var flushIndex = this.flushCheck();
			if (flushIndex >= 0) {
				//皇同或同花顺
				var strval = this.straightCheck(this.cardCodes[flushIndex]);
				if (strval > 0) {
					var typePower = strval == 12 ? CardTypeUtil.ins.type_royal_flush : CardTypeUtil.ins.type_straight_flush;
					return (typePower << this.VSHIFT ^ strval << this.MAJOR_SHIFT);
				}
				// 金刚
				var fourKindRankMask = this.fourKindCheck(four_mask);
				if (fourKindRankMask > 0) {
					return (CardTypeUtil.ins.type_four_kind << this.VSHIFT) ^ fourKindRankMask;
				}
				// 葫芦
				var fullHouseRankMask = this.fullHouseCheck(three_four_mask);
				if (fullHouseRankMask > 0) {
					return (CardTypeUtil.ins.type_full_house << this.VSHIFT) ^ fullHouseRankMask;
				}
				// 同花
				return (CardTypeUtil.ins.type_flush << this.VSHIFT ^ this.table.topFiveRanksTable[this.flushRanks]);
			}
		}
		// 金刚
		var fourKindRankMask = this.fourKindCheck(four_mask);
		if (fourKindRankMask > 0) {
			// 要添加金刚和葫芦的判断
			return (CardTypeUtil.ins.type_four_kind << this.VSHIFT) ^ fourKindRankMask;
		}
		// 葫芦
		var fullHouseRankMask = this.fullHouseCheck(three_four_mask);
		if (fullHouseRankMask > 0) {
			return (CardTypeUtil.ins.type_full_house << this.VSHIFT) ^ fullHouseRankMask;
		}
		// 顺子
		var strval = this.straightCheck(rankmask);
		if (strval > 0) {
			return (CardTypeUtil.ins.type_straight << this.VSHIFT ^ strval << this.MAJOR_SHIFT);
		}
		// 三条
		var threeKindRankMask = this.threeKindCheck(three_four_mask);
		if (threeKindRankMask > 0) {
			return (CardTypeUtil.ins.type_three_kind << this.VSHIFT) ^ threeKindRankMask;
		}
		// 两对
		var two_mask = rankmask ^ (c ^ d ^ h ^ s) | three_four_mask;
		var twoPairRankMask = this.twoPairCheck(two_mask);
		if (twoPairRankMask > 0) {
			return (CardTypeUtil.ins.type_two_pairs << this.VSHIFT) ^ twoPairRankMask;
		}
		// 一对
		var two_mask = rankmask ^ (c ^ d ^ h ^ s) | three_four_mask;
		var onePairRankMask = this.onePairCheck(two_mask);
		if (onePairRankMask > 0) {
			return (CardTypeUtil.ins.type_one_pair << this.VSHIFT) ^ onePairRankMask;
		}

		var hightCardsRankMask = this.hightCardsCheck();
		return CardTypeUtil.ins.type_hight_card << this.VSHIFT ^ hightCardsRankMask;
	}

	private flushCheck(): number {
		var flushIndex = -1;
		for (var i = 0; i < this.cardCodes.length; i++) {
			//有5张以上同花，并且手牌数要超过2张，公共牌要超过3张
			if (this.table.nRanksTable[this.cardCodes[i]] >= 5 &&
				this.table.nRanksTable[this.handCodes[i]] >= 2 &&
				this.table.nRanksTable[this.boardsCodes[i]] >= 3) {
				var handCard0 = 1 << this.table.topRankTable[this.handCodes[i]];
				var handCard1 = 1 << this.table.topRankTable[this.handCodes[i] ^ handCard0];
				var boardCard0 = 1 << this.table.topRankTable[this.boardsCodes[i]];
				var boardCard1 = 1 << this.table.topRankTable[this.boardsCodes[i] ^ boardCard0];
				var boardCard2 = 1 << this.table.topRankTable[this.boardsCodes[i] ^ boardCard0 ^ boardCard1];
				this.flushRanks = handCard0 ^ handCard1 ^ boardCard0 ^ boardCard1 ^ boardCard2;
				flushIndex = i;
			}
		}
		return flushIndex;
	}

	private straightCheck(rankmask: number): number {
		var topind = this.table.straightTable[rankmask];
		if (topind > 0) {
			var straghtRankMask = topind == 3 ? 0b1000000001111 : this.table.topFiveRanksTable[(1 << topind + 1) - 1];
			var handCards = this.handRankMask & straghtRankMask;
			var boardsCards = this.boardsRankMask & straghtRankMask;
			if (this.table.nRanksTable[handCards] >= 2 && this.table.nRanksTable[boardsCards] >= 3) {
				return topind;
			} else {
				this.straightCheck(rankmask ^ 1 << topind);
			}
		} else {
			return -1;
		}
	}

	private fourKindCheck(rankmask: number) {
		var topind: number = -1;
		var botind: number = -1;
		var topind = this.table.topRankTable[rankmask];
		var botind = this.table.topRankTable[rankmask ^ 1 << topind];
		var handCount = this.getCardsNumById(this.handCodes, topind);
		var boardCount = this.getCardsNumById(this.boardsCodes, topind);
		if (handCount == 2 && boardCount == 2) {
			var kicker = this.table.topRankTable[this.boardsRankMask ^ 1 << topind];
			return topind << this.MAJOR_SHIFT ^ 1 << kicker;
		} else if (handCount == 1 && boardCount == 3) {
			var kicker = this.table.topRankTable[this.handRankMask ^ 1 << topind];
			return topind << this.MAJOR_SHIFT ^ 1 << kicker;
		} else if (botind >= 0) {
			return this.fourKindCheck(rankmask ^ 1 << topind);
		} else {
			return -1;
		}
	}

	private fullHouseCheck(rankmask: number) {
		var topind = this.table.topRankTable[rankmask];
		if (topind >= 0) {
			var handCount = this.getCardsNumById(this.handCodes, topind);
			var boardCount = this.getCardsNumById(this.boardsCodes, topind);
			if (handCount == 0 && boardCount >= 3) {
				var pairRankMask = this.getPairMask(this.handCodes, topind);
				var pair = this.getPair(pairRankMask, 0);
			}
			if (handCount == 1 && boardCount >= 2) {
				var pairRankMask = this.getPairMask(this.cardCodes, topind);
				var pair = this.getPair(pairRankMask, 1);
			}
			if (handCount >= 2 && boardCount >= 1) {
				var pairRankMask = this.getPairMask(this.boardsCodes, topind);
				var pair = this.getPair(pairRankMask, 2);
			}
			if (pair >= 0) {
				return topind << this.MAJOR_SHIFT ^ pair << this.MINOR_SHIFT;
			}
		}
		var botind = this.table.topRankTable[rankmask ^ 1 << topind];
		return botind >= 0 ? this.fullHouseCheck(rankmask ^ 1 << topind) : -1;
	}

	private getPairMask(cardCodes: Array<number>, topind: number) {
		var d = cardCodes[0];
		var c = cardCodes[1];
		var h = cardCodes[2];
		var s = cardCodes[3];
		var rankmask = d | c | h | s;
		var three_four_mask = ((c & d) | (h & s)) & ((c & h) | (d & s));
		var two_mask = rankmask ^ (d ^ c ^ h ^ s);
		var rankmask = two_mask | three_four_mask | 1 << topind;
		return rankmask ^ 1 << topind;
	}

	private getPair(pairRankMask: number, type: number) {
		var pair = this.table.topRankTable[pairRankMask];
		if (pair >= 0) {
			var two_handCount = this.getCardsNumById(this.handCodes, pair);
			var two_boardCount = this.getCardsNumById(this.boardsCodes, pair);
			if (type == 0) {
				if (two_handCount >= 2) {
					return pair;
				}
			} else if (type == 1) {
				if (two_handCount == 1 && two_boardCount >= 1) {
					return pair;
				}
			} else if (type == 2) {
				if (two_boardCount >= 2) {
					return pair;
				}
			}
		}
		// 第二个对子不满足，再递归找下一个对子
		var pair1 = this.table.topRankTable[pairRankMask ^ 1 << pair];
		return pair1 >= 0 ? this.getPair(pairRankMask ^ 1 << pair, type) : -1;
	}

	private threeKindCheck(rankmask: number) {
		var topind = this.table.topRankTable[rankmask];
		if (topind >= 0) {
			var handCount = this.getCardsNumById(this.handCodes, topind);
			var boardCount = this.getCardsNumById(this.boardsCodes, topind);
			if (handCount == 0 && boardCount >= 3) {
				var kicker = this.table.topRankTable[this.handRankMask];
				var kicker2 = this.table.topRankTable[this.handRankMask ^ kicker];
				return (topind << this.MAJOR_SHIFT) ^ 1 << kicker ^ 1 << kicker2;
			}
			if (handCount == 1 && boardCount >= 2) {
				var kicker = this.table.topRankTable[this.handRankMask ^ 1 << topind];
				var kicker2 = this.table.topRankTable[this.boardsRankMask ^ 1 << topind];
				return (topind << this.MAJOR_SHIFT) ^ 1 << kicker ^ 1 << kicker2;
			}
			if (handCount >= 2 && boardCount >= 1) {
				var kicker = this.table.topRankTable[this.boardsRankMask ^ 1 << topind];
				var kicker2 = this.table.topRankTable[this.boardsRankMask ^ 1 << topind ^ 1 << kicker];
				return (topind << this.MAJOR_SHIFT) ^ 1 << kicker ^ 1 << kicker2;
			}
		}
		var botind = this.table.topRankTable[rankmask ^ 1 << topind];
		return botind >= 0 ? this.threeKindCheck(rankmask ^ 1 << topind) : -1;
	}

	private twoPairCheck(rankmask: number): number {
		var topPair = this.table.topRankTable[rankmask];
		if (topPair >= 0) {
			var handCount = this.getCardsNumById(this.handCodes, topPair);
			var boardCount = this.getCardsNumById(this.boardsCodes, topPair);
			if (handCount == 0 && boardCount >= 2) {
				var twoPair = this.botPairWithHightCard(rankmask, 0, topPair);
			} else if (handCount == 1 && boardCount >= 1) {
				var twoPair = this.botPairWithHightCard(rankmask, 1, topPair);
			} else if (handCount >= 2) {
				var twoPair = this.botPairWithHightCard(rankmask, 2, topPair);
			}
			if (twoPair >= 0) {
				return twoPair;
			}
		}
		// 第一个对子不满足，再递归找下一个对子
		var pair = this.table.topRankTable[rankmask ^ 1 << topPair];
		return pair >= 0 ? this.twoPairCheck(rankmask ^ 1 << topPair) : -1;
	}

	private botPairWithHightCard(pairRankMask: number, type: number, topPair: number) {
		var botPair = this.table.topRankTable[pairRankMask ^ 1 << topPair];
		if (botPair >= 0) {
			var handCount = this.getCardsNumById(this.handCodes, botPair);
			var boardCount = this.getCardsNumById(this.boardsCodes, botPair);
			if (type == 0) {
				if (handCount >= 2) {
					return this.hightCardCheck(this.boardsRankMask, topPair, botPair);
				} else if (handCount >= 1 && boardCount >= 1) {
					return this.hightCardCheck(this.handRankMask, topPair, botPair);
				}
			} else if (type == 1) {
				if (handCount >= 1 && boardCount >= 1) {
					return this.hightCardCheck(this.boardsRankMask, topPair, botPair);
				} else if (boardCount >= 2) {
					return this.hightCardCheck(this.handRankMask, topPair, botPair);
				}
			} else if (type == 2) {
				if (boardCount >= 2) {
					return this.hightCardCheck(this.boardsRankMask, topPair, botPair);
				}
			}
		}
		// 第二个对子不满足，再递归找下一个对子
		var pair = this.table.topRankTable[pairRankMask ^ 1 << botPair];
		return pair >= 0 ? this.botPairWithHightCard(pairRankMask ^ 1 << botPair, type, topPair) : -1;
	}

	private hightCardCheck(rankmask: number, topPair: number, botPair: number): number {
		var hightRankMask = ((rankmask | 1 << topPair) ^ 1 << topPair | 1 << botPair) ^ 1 << botPair;
		var hightCard = this.table.topRankTable[hightRankMask];
		return topPair << this.MAJOR_SHIFT ^ botPair << this.MINOR_SHIFT ^ 1 << hightCard;
	}

	private onePairCheck(rankmask: number): number {
		var onePair = this.table.topRankTable[rankmask];
		if (onePair >= 0) {
			var handCount = this.getCardsNumById(this.handCodes, onePair);
			var boardCount = this.getCardsNumById(this.boardsCodes, onePair);
			if (handCount == 0 && boardCount >= 2) {
				var kicker = this.table.topRankTable[this.handRankMask];
				var kicker2 = this.table.topRankTable[this.handRankMask ^ 1 << kicker];
				var kicker3 = this.table.topRankTable[this.boardsRankMask ^ 1 << onePair];
				return (onePair << this.MAJOR_SHIFT) ^ 1 << kicker ^ 1 << kicker2 ^ 1 << kicker3;
			} else if (handCount == 1 && boardCount >= 1) {
				var kicker = this.table.topRankTable[this.handRankMask ^ 1 << onePair];
				var kicker2 = this.table.topRankTable[this.boardsRankMask ^ 1 << onePair];
				var kicker3 = this.table.topRankTable[this.boardsRankMask ^ 1 << onePair ^ 1 << kicker2];
				return (onePair << this.MAJOR_SHIFT) ^ 1 << kicker ^ 1 << kicker2 ^ 1 << kicker3;
			} else if (handCount >= 2) {
				var kicker = this.table.topRankTable[this.boardsRankMask];
				var kicker2 = this.table.topRankTable[this.boardsRankMask ^ 1 << kicker];
				var kicker3 = this.table.topRankTable[this.boardsRankMask ^ 1 << kicker ^ 1 << kicker2];
				return (onePair << this.MAJOR_SHIFT) ^ 1 << kicker ^ 1 << kicker2 ^ 1 << kicker3;
			}
		}
		return -1;
	}

	private hightCardsCheck(): number {
		var handCard0 = 1 << this.table.topRankTable[this.handRankMask];
		var handCard1 = 1 << this.table.topRankTable[this.handRankMask ^ handCard0];
		var boardCard0 = 1 << this.table.topRankTable[this.boardsRankMask];
		var boardCard1 = 1 << this.table.topRankTable[this.boardsRankMask ^ boardCard0];
		var boardCard2 = 1 << this.table.topRankTable[this.boardsRankMask ^ boardCard0 ^ boardCard1];
		return handCard0 ^ handCard1 ^ boardCard0 ^ boardCard1 ^ boardCard2;
	}

	private getCardsNumById(cardCodes: Array<number>, topind: number) {
		var count = 0;
		for (var i = 0; i < cardCodes.length; i++) {
			if (cardCodes[i] & 1 << topind) {
				count++;
			}
		}
		return count;
	}
}