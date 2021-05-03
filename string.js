//JS字符串对象的基本探索

{
    //什么是字符串：
    let str = new String("123");
    console.log(str);
    //length
    console.log(str[1]);
    str[1] = "8";  //无法通过下标进行修改！
    console.log(str);
}
{
    let str = "we2";
    console.log(typeof str, str.length, str[0]);
    str[0] = "2";
    // console.log(str); //无法通过下标修改

    //console.log(str.charAt('k'),'c');

    //方法：
    let str1 = new String("2wd");
    str1._charAt = function (index) {
        if (typeof index !== "number") {
            index = 0;
        }
        if (index > this.length - 1 || index < 0) return "";
        return this[index];
    };
    console.log(
        str1._charAt(),
        str1._charAt(-2),
        str1._charAt("d"),
        str1._charAt(1),
        str1._charAt(9)
    );

    console.log(str1.indexOf(2)); //强制转化为字符串，不填则为'iundefined'字符串！
    str1._indexOf = function (searchVal, start = 0) {
        if (searchVal === "") {
            if (start >= str1.length) return str1.length;
            return start;
        } else {
            if (searchVal === undefined) {
                searchVal = "undefined";
            } else if (typeof searchVal !== "string") {
                searchVal = "" + searchVal;
            }
            if (searchVal.length > str1.length) return -1;
            let Res = -1;
            for (let i = start; i <= str1.length - searchVal.length; i++) {
                let res = false;
                for (let j = 0; j < searchVal.length; j++) {
                    if (searchVal[j] !== str1[i + j]) break;
                    if (j === searchVal.length - 1) {
                        res = true;
                    }
                }
                if (res) {
                    Res = i;
                }
            }
            return Res;
        }
    };
    console.log(str1._indexOf("2s"));

    str1._includes = function (searchVal, start) {
        if (typeof start !== "number") {
            start = 0;
        }
        if (searchVal.length > this.length) return false;
        return this._indexOf(searchVal, start) > -1;
    };

    console.log(str1.match(/([a-z])/));
}