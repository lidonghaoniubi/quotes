const getData = (v) =>
  new Promise((resolve) => setTimeout(() => resolve(v), 1000));

Promise.resolve(getData("test")).then((d) => console.log(d));

// async 方法
async function test1() {
  const data1 = await getData("data1");
  console.log("data1", data1);
  const data2 = await getData("data2");
  console.log("data2", data2);
  return "done";
}

// test1().then((res) => console.log(res));

// generator 方法
function* test2() {
  const data1 = yield getData("data1");
  console.log("data1", data1);
  const data2 = yield getData("data2");
  console.log("data2", data2);
  return "done";
}

let _test2 = test2(); // 这是一个promise

let _test2_next_1 = _test2.next();

// _test2_next_1.value.then((res) => {
//   console.log(res); // data1 在这里得到 yield getData("data1") 的结果
// });

// _test2.then((res) => {
//   // console.log(res);
// });

// console.log(_test2.next());
// console.log(_test2.next());
// console.log(_test2.next());
// console.log(_test2.next());

// gen -> async
function gen2async(genFn) {
  return function () {
    // 先调用generator函数 生成迭代器
    const gen = genFn.apply(this, arguments);

    // 返回一个promise 因为外部是用.then的方式 或者await的方式去使用这个函数的返回值的
    return new Promise((resolve, reject) => {
      // 内部定义一个step函数 用来一步一步的跨过yield的阻碍
      // key有next和throw两种取值，分别对应了gen的next和throw方法
      // arg参数则是用来把promise resolve出来的值交给下一个yield
      function steps(key, arg) {
        let gen_next;

        // 这个方法需要包裹在try catch中
        // 如果报错了 就把promise给reject掉 外部通过.catch可以获取到错误
        try {
          gen_next = gen[key](arg);
        } catch (e) {
          reject(e);
        }

        // gen.next() 得到的结果是一个 { value, done } 的结构
        const { value, done } = gen_next;
        if (done) {
          // 如果已经完成了 就直接resolve这个promise
          // 这个done是在最后一次调用next后才会为true
          // 以例子来说 此时的结果是 { done: true, value: 'done' }
          // 这个value也就是generator函数最后的返回值
          resolve(value);
        } else {
          // 除了最后结束的时候外，每次调用gen.next()
          // 其实是返回 { value: Promise, done: false } 的结构，
          // 这里要注意的是Promise.resolve可以接受一个promise为参数
          // 并且这个promise参数被resolve的时候，这个then才会被调用
          // val 就是 执行的 arg
          return Promise.resolve(value).then(
            // value这个promise被resove的时候，就会执行next
            // 并且只要done不是true的时候 就会递归的往下解开promise
            // 对应gen.next().value.then(value => {
            //    gen.next(value).value.then(value2 => {
            //       gen.next()
            //
            //      // 此时done为true了 整个promise被resolve了
            //      // 最外部的test().then(res => console.log(res))的then就开始执行了
            //    })
            // })
            (val) => steps("next", val),
            // 如果promise被reject了 就再次进入step函数
            // 不同的是，这次的try catch中调用的是gen.throw(err)
            // 那么自然就被catch到 然后把promise给reject掉啦
            (err) => steps("throw", err)
          );
        }
      }
      steps("next");
    });
  };
}

let async_test2 = gen2async(test2);

async_test2().then((res) => console.log(res));
