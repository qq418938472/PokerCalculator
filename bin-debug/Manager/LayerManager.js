var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LayerManager = (function () {
    function LayerManager() {
    }
    LayerManager.addBaseLayer = function (o) {
        LayerManager.baseUILayer.addChild(o);
    };
    LayerManager.removeBaseLayer = function (o) {
        LayerManager.baseUILayer.removeChild(o);
    };
    LayerManager.initBaseLayer = function () {
        LayerManager.main.addChild(LayerManager.baseUILayer);
    };
    LayerManager.init = function (m) {
        this.main = m;
        LayerManager.initBaseLayer();
    };
    LayerManager.baseUILayer = new egret.DisplayObjectContainer();
    return LayerManager;
}());
__reflect(LayerManager.prototype, "LayerManager");
//# sourceMappingURL=LayerManager.js.map