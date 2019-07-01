var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Animation = (function () {
    function Animation() {
    }
    Animation.getInstance = function () {
        if (!this._instance) {
            this._instance = new Animation();
        }
        return this._instance;
    };
    Animation.prototype.animationPlay = function (name, obj, time, callBack, thisObject) {
        if (callBack === void 0) { callBack = function () { }; }
        this.time = time;
        this.object = obj;
        switch (name) {
            case "hide":
                this.slowlyHide(callBack, thisObject);
                break;
            case "show":
                this.slowlyShow(callBack, thisObject);
                break;
            case "slowlyShow":
                this.middleSlowlyShow(callBack, thisObject);
                break;
            default:
                callBack.call(thisObject);
        }
    };
    //淡入
    Animation.prototype.slowlyHide = function (callBack, thisObject) {
        if (callBack === void 0) { callBack = function () { }; }
        egret.Tween.get(this.object).to({ alpha: 0 }, this.time).call(callBack, thisObject);
    };
    //淡出
    Animation.prototype.slowlyShow = function (callBack, thisObject) {
        if (callBack === void 0) { callBack = function () { }; }
        this.object.alpha = 0;
        egret.Tween.get(this.object).to({ alpha: 1 }, this.time).call(callBack, thisObject);
    };
    //从中间轻微弹出
    Animation.prototype.middleSlowlyShow = function (callBack, thisObject) {
        if (callBack === void 0) { callBack = function () { }; }
        this.object.alpha = 0;
        this.object.scaleX = 0.5;
        this.object.scaleY = 0.5;
        egret.Tween.get(this.object).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut).call(callBack, thisObject);
    };
    //从中间猛烈弹出
    Animation.prototype.middleViolentShow = function (callBack, thisObject) {
        if (callBack === void 0) { callBack = function () { }; }
        this.object.alpha = 0;
        this.object.scaleX = 0.5;
        this.object.scaleY = 0.5;
        egret.Tween.get(this.object).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 600, egret.Ease.elasticOut).call(callBack, thisObject);
    };
    //从中间缩小消失
    Animation.prototype.middleReduceHide = function (callBack, thisObject) {
        if (callBack === void 0) { callBack = function () { }; }
        egret.Tween.get(this.object).to({ alpha: 0, scaleX: 0, scaleY: 0 }, 300).call(callBack, thisObject);
    };
    return Animation;
}());
__reflect(Animation.prototype, "Animation");
//# sourceMappingURL=Animation.js.map