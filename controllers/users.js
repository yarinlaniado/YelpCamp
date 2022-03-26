const User = require("../models/user");
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body.user;
    const user = User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      else {
        req.flash("success", "Welcome to YelpCamp");
        res.redirect("/campgrounds");
      }
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
};
module.exports.renderLogin = (req, res) => {
  res.render("Users/login");
};
module.exports.login = (req, res) => {
  req.flash("success", "welcome back!");
  const redirectUrl = req.session.returnTo || "/campgrounds";
  delete req.session.returnTo;
  return res.redirect(redirectUrl);
};
module.exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "Bye!");
  res.redirect("/campgrounds");
};
