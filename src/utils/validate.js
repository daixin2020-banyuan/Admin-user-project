export function validateUsername(rule, value, callback) {
  const reg = /^[A-Za-z0-9]+$/;
  if (value == "" || value == undefined || value == null) {
    callback(new Error("请输入用户名"));
  } else {
    if (!reg.test(value)) {
      console.log("正则", reg.test(value));
      callback(new Error("请输入英文字母或数字"));
    } else {
      callback();
    }
  }
}
