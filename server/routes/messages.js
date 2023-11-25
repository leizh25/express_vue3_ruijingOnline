var express = require("express");
var router = express.Router();
const path = require("node:path");
const fs = require("node:fs/promises");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const msgFile = path.resolve(__dirname, "../resource/messages/index.json");
const adapter = new FileSync(msgFile);
const db = low(adapter);
const nanoid = require("nanoid").nanoid;
//读取消息
router.get("/", async (req, res) => {
  const res2 = await db.get("posts").write();
  //   console.log("res2: ", res2);
  res.json({
    code: 200,
    data: res2,
  });
});

//写入消息
router.post("/", async (req, res) => {
  const { content } = req.body;
  console.log("content: ", req.body);
  try {
    await db
      .get("posts")
      .push({ id: nanoid(), content, time: new Date().toLocaleString() })
      .write();
    res.json({ code: 200 });
  } catch (error) {
    res.json({ code: 500, msg: error.message });
  }
});
//删除消息
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.get("posts").remove({ id }).write();
    res.json({ code: 200 });
  } catch (error) {
    res.json({ code: 500, msg: error.message });
  }
});

module.exports = router;
