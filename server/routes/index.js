var express = require("express");
var router = express.Router();
const path = require("node:path");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const msgFile = path.resolve(__dirname, "../resource/user/index.json");
const adapter = new FileSync(msgFile);
const db = low(adapter);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/login", function (req, res, next) {
  const { username, password } = req.body;
  const res1 = db.get("users").find({ username }).write();
  // console.log("res1: ", res1);
  if (res1) {
    if (res1.password === password) {
      res.json({
        code: 200,
        msg: "登录成功",
      });
    } else {
      res.json({
        code: 400,
        msg: "用户名或密码错误",
      });
    }
  } else {
    res.json({
      code: 400,
      msg: "用户名或密码错误",
    });
  }
});

//注册
router.post("/register", function (req, res, next) {
  const { username, password } = req.body;
  const res1 = db.get("users").find({ username }).write();
  if (res1) {
    res.json({
      code: 400,
      msg: "用户名已存在",
    });
  } else {
    db.get("users")
      .push({
        username,
        password,
      })
      .write();
    res.json({
      code: 200,
      msg: "注册成功",
    });
  }
});

module.exports = router;
