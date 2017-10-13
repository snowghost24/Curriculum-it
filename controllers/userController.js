const express = require("express");
const router = express.Router();

// Import the model (users.js) to use its database functions.
const orm = require("../models/users.js")

//Hard coded for testing
var userId = 'ankita';
var getUser = require('./routes.js');
// console.log(getUser.logger[0])

//===========================================
//----------------ROUTES---------------------
//===========================================

// Create all our routes and set up logic within those routes where required.

//====================GET ALL COURSES=================

router.get("/allCourses", function(req, res) {

  orm.allCourse(function(result) {
    var allCourses = result;
    console.log(allCourses);
    //res.render("index2", {allCourses});
  });

  //res.redirect("/profile");

});

//===============GET ALL OF USER'S COURSES============

router.get("/profile/addcourse", function (req, res) {

  //Jose is a liar and will take care of getting the user id

  orm.myCourses(userId, function(result) {
    
    var row = JSON.stringify(result);
    var data = JSON.parse(row);

    courseName = data[0].name;
    courseDesc = data[0].description;
    console.log("Course name: " + courseName);
    console.log("Course description: " + courseDesc);
    console.log("All data from course: " + data[0]);
    //res.render("index2", {course: courseName});
  }); 

  res.redirect("/profile/course");  
});

//=============ADD COURSES==================

router.post("/profile/course", function (req, res) {

  //Jose taking care of user ID
  
  orm.addCourse(1, userId, function(result) {
    console.log(result);
  });
  
    //res.redirect("/profile");

});

//============GET ALL OF PARTICULAR USER'S COURSES===========

router.get("/user/allCourses/", function (req, res) {
  //var userId = req.params.id;

  //***Retrieve user id****/

  user.myCourses(userId, function(res) {
    orm.myCourses(userId, function (res) {
      cb(res);
    });
  });

});

//=======UPDATE USER'S COURSE=============

orm.updateCourse(1, function() {
  
});

/* REFERENCE
updateCourse: function (id, cb) {
  orm.updateCourse(id, function (res) {
      cb(res);
  });
},
*/

module.exports = router;