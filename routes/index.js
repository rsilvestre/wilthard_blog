var express = require('express');
var router = express.Router();

var SessionHandler = require('./session')
    , ContentHandler = require('./content')
    , ErrorHandler = require('./error').errorHandler;

module.exports = exports = function(app, db) {

  var sessionHandler = new SessionHandler(db);
  var contentHandler = new ContentHandler(db);

  // Middleware to see if a user is logged in
  app.use(sessionHandler.isLoggedInMiddleware);

  // The main page of the blog
  app.route('/')
      .get(contentHandler.displayMainPage);

  // The main page of the blog, filtered by tag
  app.route('/tag/:tag')
      .get(contentHandler.displayMainPageByTag);

  // A single post, which can be commented on
  app.route("/post/:permalink/show")
      .get(contentHandler.displayPostByPermalink);

  app.route("/post/:permalink/edit")
      .get(contentHandler.displayEditPostPage)
      .post(contentHandler.handleEditPost);

  app.route("/post/:permalink/delete")

  app.route("/post/:permalink")
      .get(contentHandler.displayPostByPermalink)
      .delete(contentHandler.handleDeletePost);

  app.route('/newcomment')
      .post(contentHandler.handleNewComment);

  app.route("/post_not_found")
      .get(contentHandler.displayPostNotFound);

  // Displays the form allowing a user to add a new post. Only works for logged in users
  app.route('/newpost')
      .get(contentHandler.displayNewPostPage)
      .post(contentHandler.handleNewPost)
      .put(contentHandler.handleEditPost);

  // Used to process a like on a blog post
  app.route('/like')
      .post(contentHandler.handleLike);

  // Login form
  app.route('/login')
      .get(sessionHandler.displayLoginPage)
      .post(sessionHandler.handleLoginRequest);

  // Logout page
  app.route('/logout')
      .get(sessionHandler.displayLogoutPage);

  // Welcome page
  app.route("/welcome")
      .get(sessionHandler.displayWelcomePage);

  // Signup form
  app.route('/signup')
      .get(sessionHandler.displaySignupPage)
      .post(sessionHandler.handleSignup);

  // Error handling middleware
  app.use(ErrorHandler);
};

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

//module.exports = router;
