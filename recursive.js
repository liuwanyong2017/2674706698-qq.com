//递归算法 ：
// 吃苹果问题，爬梯子问题
let arr = [[1], [2]], sums = [1, 2];
const x = num => {
    const copy = [];
    sums.map(
        (sum, index) => {
            if (sum) {
                const item = [...arr[index]];
                if (sum + 1 <= num) {
                    arr[index].push(1);
                    sums[index] += 1;
                    if (sums[index] === num) {
                        sums[index] = null;
                    }
                }
                if (sum + 2 <= num) {
                    item.push(2);
                    copy.push(item);
                    sums.push(sum + 2 === num ? null : sum + 2);
                }
            }
        }
    );
    // console.log(arr,sums,copy);
    arr = arr.concat(copy);
};

const eat = num => {
    while (sums.filter(val => val).length) {
        x(num);
    }
};

// eat(4);
// console.log(arr.length);
//这是我当初的基本思路，代码写的可能没现在这版如此的清晰。
//当初，我执着于求出组合的具体内容，根本就不限于题目的结果，一共有多少种！
// 回归到题目，我可以再优化的：
{
    let sums = [1, 2];

    const y = num => {
        const copy = [];
        sums.map(
            (sum, i) => {
                if (sum === null) return;
                if (sum === num) return sums[i] = null;
                if (sum + 1 <= num) {
                    sums[i] += 1;
                }
                if (sum + 2 <= num) {
                    copy.push(sum + 2);
                }
            }
        );
        sums = sums.concat(copy);
    };

    const eat1 = num => {
        while (sums.filter(val => val).length) {
            y(num);
        }
        return sums.length;
    };
    // console.log(eat1(20));
}

//爬梯子的题目：
//错误的思路：
{
    const storage = {count: 1};
    let counts = [1, 2];
    const x = (num, lastChange) => {
        // if (num === 0) return ;
        // if (num === 1) return 1;
        // if (num === 2) return 2;
        if (num - 1 >= 0) {
            // lastChange !== 1 && (storage.count += 1)   //计数错误
            // console.log(num,'n');
            x(num - 1, 1);
        }
        if (num - 2 >= 0) {
            (storage.count += 1);   //计数错误
            // console.log(num,'n');
            x(num - 2, 2);
        }
    };
    x(30);
    console.log(storage.count);
}

//正确的递归思路
//抽象出来重复的逻辑：重复的逻辑一定要用n，n-1,n-2如此的普遍性的意义来表示参数！
//由一般，推出共性！穷举法是找思路，在没有思路的情况下！

// 穷举法就不列了，通过穷举法，用归纳法得出来 f(n) = f(n-1)+f(n-2)
//抽象化，加深理解：走到第n个台阶，必须要先走到第n-1，或第n-2个台阶上！
//如此就反过来解释归纳法的正确性了，n-1与n-2的情况互斥，并且互补！
//问题转化：
{
    const x = n => {
        if (n === 1) return 1;
        if (n === 2) return 2;
        if (n >= 3) {
            let last1 = x(1), last2 = x(2), i = 3;
            while (i <= n - 1) {
                i % 2 !== 0 ? last1 += last2 :
                    last2 += last1;
                i++;
            }
            return last2 + last1;
        }
    };
    console.log(2);
    console.log(x(3));
}

//括号问题 https://leetcode-cn.com/problems/generate-parentheses/
{
    let arr = [
        {
            val: "(", left: 1, right: 0, ok: false
        }
    ], res = [];
    const x = (n) => {
        while (arr.length) {
            const arr1 = [];
            arr.map(
                ({val, left, right, ok}, i) => {
                    if (ok) return;
                    if (right < n) {
                        if (left < n) {
                            if (left < right) {
                                return arr[i].ok = null;
                            }
                            ;
                            const copy = {val, left, right, ok};
                            copy.val += ")";
                            copy.right += 1;
                            if (right + 1 === n && left === n) {
                                copy.ok = true;
                                res.push(copy.val);
                            } else {
                                arr1.push(copy);
                            }
                        } else {
                            arr[i].val += ")";
                            arr[i].right += 1;
                            if (right + 1 === n && left === n) {
                                arr[i].ok = true;
                                res.push(val + ")");
                            }
                        }
                    }
                    if (left < n) {
                        if (right > left) {
                            arr[i].ok = null;
                        } else {
                            arr[i].val += "(";
                            arr[i].left += 1;
                        }
                    }
                }
            );
            arr = arr.concat(arr1).filter(val => val.ok !== null && !val.ok);
        }
    };
    x(5);
    console.log(res.length, arr);
}

//递归：
{
    const res = [];
    const x = ( n, s,left,right) => {
        if (left === n && right === n) return res.push(s);
        if (right<left){
            x(n,s+')',left,right+1)
        }
        if (left < n &&left>= right){
            x(n,s+'(',left+1,right)
        }

    };
    x(3,'',0,0)
    console.log(res);
}

