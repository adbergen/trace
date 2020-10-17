// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const trackingRequest = require("../util/tracker-api");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    console.log("POST  /api/signup", req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    console.log("GET  /logout");
    req.logout();
    res.redirect("/");
  });
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      console.log(req.user);
      res.json({
        email: req.user.email,
        id: req.user.id,
        trackings: req.user.Trackings,
      });
    }
  });

  // Route for getting some data about our user to be used client side
  app.post("/api/tracking", (req, res) => {
    console.log("POST  /api/tracking");

    // console.log(db.User.create, "create");
    if (!req.user) {
      // The user is not logged in, send back an empty object
      return res.json({});
    }

    console.log("req.body", req.body);
    console.log("req.user", req.user);
    db.Tracking.create({
      trackingNumber: req.body.tracking,
      carrier: req.body.carrier,
      UserId: req.user.id,
    })
      .then((result) => {
        console.log("successfully added to the database", result);
        req.user.Trackings.push(result);
        trackingRequest(req.body.tracking, req.body.carrier, (data) => {
          return res.json(data);
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });

    // var jsonData = fs.readFileSync("trackingfile.json", "utf8");
    // console.log(jsonData);

    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    // res.json(JSON.parse(jsonData));
  });
};
