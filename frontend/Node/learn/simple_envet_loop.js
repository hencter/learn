const { resolve } = require("path");

const bar = () => console.log("bar");
const baz = () => console.log("baz");

const foo = () => {
  console.log("foo");
  //   bar();
  setTimeout(bar, 0);
  new Promise((ressolve, reject) => {
    ressolve("在 baz 之后，bar之前");
  }).then((resolve) => console.log(resolve));
  baz();
};

foo();
