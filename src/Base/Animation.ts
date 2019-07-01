class Animation {
    public constructor() {

    }

    private static _instance: Animation;
    public static getInstance(): Animation {
        if (!this._instance) {
            this._instance = new Animation();
        }
        return this._instance;
    }

    private time: number;
    private object: egret.DisplayObject;
    public animationPlay(name: string, obj: egret.DisplayObject, time: number, callBack: Function = function () { }, thisObject?: any) {
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
    }

    //淡入
    private slowlyHide(callBack: Function = function () { }, thisObject?: any) {
        egret.Tween.get(this.object).to({ alpha: 0 }, this.time).call(callBack, thisObject);
    }

    //淡出
    private slowlyShow(callBack: Function = function () { }, thisObject?: any) {
        this.object.alpha = 0;
        egret.Tween.get(this.object).to({ alpha: 1 }, this.time).call(callBack, thisObject);
    }

    //从中间轻微弹出
    private middleSlowlyShow(callBack: Function = function () { }, thisObject?: any) {
        this.object.alpha = 0;
        this.object.scaleX = 0.5;
        this.object.scaleY = 0.5;
        egret.Tween.get(this.object).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut).call(callBack, thisObject);
    }

    //从中间猛烈弹出
    private middleViolentShow(callBack: Function = function () { }, thisObject?: any) {
        this.object.alpha = 0;
        this.object.scaleX = 0.5;
        this.object.scaleY = 0.5;
        egret.Tween.get(this.object).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 600, egret.Ease.elasticOut).call(callBack, thisObject);
    }

    //从中间缩小消失
    private middleReduceHide(callBack: Function = function () { }, thisObject?: any) {
        egret.Tween.get(this.object).to({ alpha: 0, scaleX: 0, scaleY: 0 }, 300).call(callBack, thisObject);
    }
}