var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ProtoEnum = (function () {
    function ProtoEnum() {
    }
    return ProtoEnum;
}());
__reflect(ProtoEnum.prototype, "ProtoEnum");
var GameType;
(function (GameType) {
    GameType[GameType["NLH"] = 0] = "NLH";
    GameType[GameType["OMAHA"] = 1] = "OMAHA";
})(GameType || (GameType = {}));
//# sourceMappingURL=ProtoEnum.js.map