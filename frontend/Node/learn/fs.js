import { stat } from "fs";

stat("./hello.js", (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  //可以访问 `stats` 中的文件属性
});
