
//面试算法题：

// 写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b 的时间，
//然后写一个 myClear，停止上面的 mySetInterVal
let  delayObj = {a:a+b,[a+b]:a+2b,[a+2b]:a},
delay = a,nextDelay = ()=>delayObj[delay]

const mySetInterval = (fn,a,b)=>{
    let timer;
    const interval = ()=>{
        timer = setTimeout(
            ()=>{
                delay = nextDelay()
                fn()
                interval()
            },delay
        )
    }
    interval()
    return ()=>{
        clearTimeout(timer)
        delay = a
    }

}
const clear = mySetInterVal(
    ()=>{
        console.log(6)
    },1,2
)

setTimeout(
    ()=>{
        clear()
    },20
)