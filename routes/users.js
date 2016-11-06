var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var passport = require('passport');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('success');
});

router.get('/register', function(req, res, next) {
    res.render('register', { title: 'demo' });
});

router.post('/register', function(req, res, next) {
    //Convenience method to register a new user instance with a given password. Checks if username is unique
    Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { title: 'demo', account: account });
        }

        passport.authenticate('local')(req, res, function() {
            res.redirect('/users');
        });


    });
});


router.get('/login', function(req, res, next) {
    res.render('login', { user: req.user });
})

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/users');
})

router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/users');
})

module.exports = router;