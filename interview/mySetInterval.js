//面试算法题：

// 写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b 的时间，
//然后写一个 myClear，停止上面的 mySetInterVal

const mySetInterval = (fn, a, b) => {
    let delayObj = {
            [a]: a + b,
            [a + b]: a + (2 * b),
            [a + (2 * b)]: a
        },
        delay = a,
        nextDelay = () => delayObj[delay],
        timer;
    const interval = () => {
        timer = setTimeout(
            () => {
                delay = nextDelay();
                fn();
                interval();
            }, delay * 1000
        );
    };
    interval();
    return () => {
        clearTimeout(timer);
        delay = a;
    };

};
let i = 0,
    timer1 = setInterval(() => {
        i++;
    }, 1000);
const clear = mySetInterval(
    () => {
        console.log(6, "i=", i);
    }, 1, 2
);

setTimeout(
    () => {
        clear();
        clearInterval(timer1);
    }, 10000
);
