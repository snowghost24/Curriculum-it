
var flash = require('connect-flash');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var connection = require("../config/connection.js");
const orm = require("../models/users.js")

// normal routes ===============================================================

// show the home page (will also have our login links)
router.get('/', function (req, res) {
    // console.log(db)
    if (req.isAuthenticated()) {
        res.redirect('/profile');
    } else { res.render('index.handlebars'); }

});

// PROFILE SECTION =========================
function createLocalUsers(req, res) {
    // TODO: here is where the user is
    var theVarId = "";
    var theVarName = "";

    if (req.user.google.id != undefined) {
        theVarId = req.user.google.id;
        theVarName = req.user.google.name;
        req.theVarId = req.user.google.id;
        req.theVarName = req.user.google.name;
    } else if (req.user.facebook.id != undefined) {
        theVarId = req.user.facebook.id;
        theVarName = req.user.facebook.name;
        req.theVarId = req.user.facebook.id;
        req.theVarName = req.user.facebook.name;
    } else if (req.user.twitter.id != undefined) {
        theVarId = req.user.twitter.id;
        theVarName = req.user.twitter.displayName;
        req.theVarId = req.user.twitter.id;
        req.theVarName = req.user.twitter.displayName;
    } else if (req.user.id != undefined) {
        theVarId = req.user.id;
        theVarName = req.user.local.name;
        req.theVarId = req.user.id;
        req.theVarName = req.user.local.name
    }

    // var returnId = function (theVarId){
    //     return global.theVarId;
    // }

    // var returnName = function (theVarName){
    //     return global.theVarName;
    // }
console.log(req.theVarName);

    connection.query('SELECT * FROM users WHERE userid = ?', [theVarId], function (error, results, fields) {
        if (error) throw error;

        if (!results[0]) {
            var post = { userid: theVarId, name: theVarName };
            var query = connection.query('INSERT INTO users SET ?', post, function (error, results, fields) {
                if (error) throw error;
            });
        } else {
            //    location.reload();
        }
    });

}
router.get('/profile', isLoggedIn, function (req, res) {
    var allCourses;
    console.log("I'm in profile");
    orm.allCourse(function(result) {
        allCourses = result;
       // console.log(allCourses[0].name);
        res.render('profile.handlebars', {passedData
            :{
            user: req.user,
            courses: allCourses
        }});
     } );
   

    createLocalUsers(req, res)
});

// LOGOUT s==============================
router.get('/logout', function (req, res) {
    req.logout();
    req.session.destroy();
    console.log("session destroyed")
    res.redirect('/');
});

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

// locally --------------------------------
// LOGIN ===============================
// show the login form
router.get('/login', function (req, res) {
    // res.render('login.handlebars', { message: req.flash('loginMessage') });

    if (req.isAuthenticated()) {
        console.log("from sign up" + req.isAuthenticated());
        res.redirect('/profile');
    } else if (!req.isAuthenticated()) { res.render('login.handlebars'); }

});



// process the login form
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

// SIGNUP =================================
// show the signup form
router.get('/signup', function (req, res) {
    console.log(req.body.name);
    if (req.isAuthenticated()) {
        console.log("from sign up" + req.isAuthenticated());
        res.redirect('/profile');
    } else { res.render('signup.handlebars', { message: req.flash('signupMessage') }); }
    // res.render('signup.handlebars', { message: req.flash('signupMessage') });
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}))

// facebook -------------------------------

// send to facebook to do the authentication
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

// twitter --------------------------------

// send to twitter to do the authentication
router.get('/auth/twitter', passport.authenticate('twitter', { scope: 'email' }));

// handle the callback after twitter has authenticated the user
router.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));


// google ---------------------------------

// send to google to do the authentication
router.get('/auth/google.html', passport.authenticate('google', { scope: ['profile', 'email'] }));

// the callback after google has authenticated the user
router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

// locally --------------------------------
router.get('/connect/local', function (req, res) {
    res.render('connect-local.handlebars', { message: req.flash('loginMessage') });
});
router.post('/connect/local', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

// facebook -------------------------------

// send to facebook to do the authentication
router.get('/connect/facebook', passport.authorize('facebook', { scope: 'email' }));

// handle the callback after facebook has authorized the user
router.get('/connect/facebook/callback',
    passport.authorize('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

// twitter --------------------------------

// send to twitter to do the authentication
router.get('/connect/twitter', passport.authorize('twitter', { scope: 'email' }));

// handle the callback after twitter has authorized the user
router.get('/connect/twitter/callback',
    passport.authorize('twitter', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));


// google ---------------------------------

// send to google to do the authentication
router.get('/connect/google', passport.authorize('google', { scope: ['profile', 'email'] }));

// the callback after google has authorized the user
router.get('/connect/google/callback',
    passport.authorize('google', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

// local -----------------------------------
router.get('/unlink/local', isLoggedIn, function (req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function (err) {
        res.redirect('/profile');
    });
});

// facebook -------------------------------
router.get('/unlink/facebook', isLoggedIn, function (req, res) {
    var user = req.user;
    user.facebook.token = undefined;
    user.save(function (err) {
        res.redirect('/profile');
    });
});

// twitter --------------------------------
router.get('/unlink/twitter', isLoggedIn, function (req, res) {
    var user = req.user;
    user.twitter.token = undefined;
    user.save(function (err) {
        res.redirect('/profile');
    });
});

// google ---------------------------------
router.get('/unlink/google', isLoggedIn, function (req, res) {
    var user = req.user;
    user.google.token = undefined;
    user.save(function (err) {
        res.redirect('/profile');
    });
});

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

// =============================================================================
// PROFILE PAGE ROUTES==========================================================
// =============================================================================

router.post("/profile/addcourse", function (req, res) {
    console.log("I'm here");
    console.log(req.body)

    orm.addToCourse(req.body.courseName, req.body.description, function(result) {
      res.redirect("/profile");
     });
 });

 router.post("/profile/enroll/:id",isLoggedIn, function (req, res) {
    console.log("I'm here at profile/enroll");
    var id = req.params.id;
    console.log(id)

    orm.addToCourse(req.body.courseName, req.body.description, function(result) {
      res.redirect("/profile");
     });
 });


module.exports = {
    dispatch:router,
    logger :isLoggedIn,
}




