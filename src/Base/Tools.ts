// TypeScript file
class Tools {
    public static GetRandomNum(Min: number, Max: number) {
        var Range = Max - Min + 1;
        var Rand = Math.random();
        var num = Min + Math.floor(Rand * Range); //四舍五入
        return num;
    }

    /**
    * 传入数组，返回乱序后的数组
    */
    public static ArrayDisorder(arr) {
        var n = arr.length;
        var a = Tools.GetRandomArray(n, 0, n - 1);
        var newArr = [];
        for (var i = 0; i < n; i++) {
            newArr[i] = arr[a[i]];
        }
        return newArr;
    }

    public static GetRandomArray(len: number, Min: number, Max: number, allowConflict?: boolean) {
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
    }

    // 从指定数组中随机选出指定个数的元素
    public static GetRandomElements(arr: any[], len: number, allowConflict?: boolean) {
        if (!allowConflict && len > arr.length || arr.length < 1) {
            console.log("Unable to generate the random elements.");
            return;
        }
        let elements = [];
        let indexArr = this.GetRandomArray(len, 0, arr.length - 1, allowConflict);
        for (let i of indexArr) {
            elements.push(JSON.parse(JSON.stringify(arr[i])));
        }
        return elements;
    }
}
