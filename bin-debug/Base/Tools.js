var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var Tools = (function () {
    function Tools() {
    }
    Tools.GetRandomNum = function (Min, Max) {
        var Range = Max - Min + 1;
        var Rand = Math.random();
        var num = Min + Math.floor(Rand * Range); //四舍五入
        return num;
    };
    /**
    * 传入数组，返回乱序后的数组
    */
    Tools.ArrayDisorder = function (arr) {
        var n = arr.length;
        var a = Tools.GetRandomArray(n, 0, n - 1);
        var newArr = [];
        for (var i = 0; i < n; i++) {
            newArr[i] = arr[a[i]];
        }
        return newArr;
    };
    Tools.GetRandomArray = function (len, Min, Max, allowConflict) {
        var num = new Array(len);
        var val;
        var isEqu = false;
        var testCount = 0;
        for (var i = 0; i < len; i++) {
            isEqu = false;
            val = this.GetRandomNum(Min, Max);
            for (var j = 0; j < i; j++) {
                if (num[j] == val) {
                    isEqu = true;
                    break;
                }
            }
            if (!allowConflict && isEqu)
                i--;
            else
                num[i] = val;
            if (testCount++ > 10000) {
                console.log("Dead loop!");
                break;
            }
        }
        return num;
    };
    // 从指定数组中随机选出指定个数的元素
    Tools.GetRandomElements = function (arr, len, allowConflict) {
        if (!allowConflict && len > arr.length || arr.length < 1) {
            console.log("Unable to generate the random elements.");
            return;
        }
        var elements = [];
        var indexArr = this.GetRandomArray(len, 0, arr.length - 1, allowConflict);
        for (var _i = 0, indexArr_1 = indexArr; _i < indexArr_1.length; _i++) {
            var i = indexArr_1[_i];
            elements.push(JSON.parse(JSON.stringify(arr[i])));
        }
        return elements;
    };
    return Tools;
}());
__reflect(Tools.prototype, "Tools");
//# sourceMappingURL=Tools.js.map