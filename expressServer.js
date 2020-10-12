if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  const express = require("express");
  const app = express();
  
  const passport = require("passport");
  const flash = require("express-flash");
  const session = require("express-session");
  const getDataRouter = require("./routes/getData");
  const initializePassport = require("./passport-config");
  
  initializePassport(
    passport,
    email => users.find((user) => user.email === email),
    id => users.find((user) => user.id === id)
  );
  
  const users = [
    {
      id: Date.now().toString(),
      email: "gmzcakil@gmail.com",
      password: "123456",
    },
  ];
  
  app.set("view engine", "ejs");
  app.use(express.urlencoded({ extended: false }));
  app.use(flash());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.use("/getData",checkAuthenticated, getDataRouter);
  
  app.get("/dashboard", checkAuthenticated, (req, res) => {
      
    res.render("dashboard");//{retrievedData : app.get('data')
  });
  app.get("/", checkAuthenticated, (req, res) => {
      //res.render("index");
    });
  
  app.get("/login", checkNotAutheticated, (req, res) => {
    res.render("login.ejs");
  });
  
  app.post(
    "/login",
    checkNotAutheticated,
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/login",
      failureFlash: true,
    })
  );
  
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }
  
  function checkNotAutheticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/dashboard");
    }
    next();
  }
  app.listen(5000);