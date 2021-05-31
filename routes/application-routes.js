const express = require("express");
const router = express.Router();

const testDao = require("../modules/test-dao.js");

// router.get("/", async function(req, res) {

//     // res.locals.title = “My route title!“;
//     // res.locals.allTestData = await testDao.retrieveAllTestData();

//     res.render("home");
// });


router.get("/my-articles", async function(req, res) {

    res.render("my-articles");
});


router.get("/read-article", async function(req, res) {

    res.render("read-article");
});


router.get("/login", async function(req, res) {
    res.render("login");
});


router.get("/new-account", async function(req, res) {
    res.render("new-account");
});

router.post("/new-account", async function(req, res) {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const username = req.body.username;
    const dob = req.body.dob;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const description = req.body.description;
    const imageSource = req.body.avatar;

    if (password == confirmPassword) {
        await testDao.createUser(fname, lname, username, dob, password, description, imageSource);
        res.redirect("/");
    } else {
        res.redirect("/new-account");
    }
});


router.get("/usernames", async function(req, res) {
    const usernames = await testDao.retrieveAllUsernames();
    res.json(usernames);
});


router.get("/accountdetails", async function(req, res) {
    //Change user id input later, this is hardcoded for now//
    const userinfo = await testDao.retrieveUserById(2);
    res.locals.user = userinfo;

    testDao.editUser(1, 'testing', 'this', 'testthis', '1999-01-01', 'newtest', 'newdesc', 'lolol');

    res.render("accountdetails");
});


router.post("/login", async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    console.log(username);
    console.log(password);

    res.redirect("/");
});

router.get("/", async function(req, res) {
    res.locals.articles = await testDao.retrieveAllArticles(); 
    res.render("home");
}); 

router.get("/articles", async function(req, res){
    const sortBy = req.query.sortBy;
    const articles = await testDao.retrieveArticlesBySort(sortBy);
    res.json(articles);
});

module.exports = router;