const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const articles = [
    {
      title: "Test 1 Article",
      createdAt: new Date(),
      description: "Merhaba Gamze",
    },
    {
      title: "Test 2 Article",
      createdAt: new Date(),
      description: "Merhaba Gamze",
    },
  ];
  res.render("getData", { articles: articles });
});

module.exports=router;