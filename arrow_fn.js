let fun1 = () => {
  console.log("fun1", this);
};
function fun2() {
  console.log("fun2", this);
}

fun1();
fun2();

(function () {
  let fun3 = () => {
    console.log("fun3", this);
  };
  function fun4() {
    console.log("fun4", this);
  }

  fun3();
  fun4();
})();
