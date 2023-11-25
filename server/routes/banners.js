var express = require("express");
var router = express.Router();
const path = require("node:path");
const fs = require("node:fs/promises");
const config = require("../config/config");

const imgPath = path.resolve(__dirname, "../resource/banners");
// 获取所有图片
router.get("/", async function (req, res, next) {
  try {
    const banners = await fs.readdir(imgPath);
    // console.log("banners: ", banners);
    if (banners.length == 0) {
      return res.status(404).json({ error: "暂无图片" });
    } else {
      const bannerArr = banners.map(banner => {
        return {
          //   name: banner.split(".")[0],
          name: banner,
          url: `${config.url}/banners/${banner}`,
        };
      });
      res.json({
        code: 200,
        data: bannerArr,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
// 获取图片
router.get("/:name", async function (req, res, next) {
  try {
    const name = req.params.name;
    const img = await fs.readFile(path.resolve(imgPath, `${name}`));
    res.writeHead(200, {
      "Content-Type": "image/png",
    });
    res.end(img);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//上传图片
router.post("/", async function (req, res, next) {
  if (!req.files) {
    return res.status(400).json({ error: "请上传图片" });
  }
  const files = req.files.file;
  if (!!files.length) {
    //多文件
    for (const file of files) {
      // console.log("file: ", file);
      await file.mv(`${imgPath}/${file.name}`);
    }
    return res.json({
      code: 200,
      data: {},
    });
  } else {
    //单文件
    try {
      await files.mv(`${imgPath}/${files.name}`);
      res.json({
        code: 200,
        data: {
          name: files.name,
          url: `${config.url}/banners/${files.name}`,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
});
// 删除图片
router.delete("/:name", async function (req, res, next) {
  try {
    const name = req.params.name;
    const imgFile = path.resolve(imgPath, `${name}`);
    console.log("imgFile: ", imgFile);
    await fs.unlink(imgFile);
    res.json({
      code: 200,
      data: {
        name: name,
      },
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: error });
  }
});

module.exports = router;
