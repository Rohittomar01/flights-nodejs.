var express = require('express');
var router = express.Router();
var pool = require('./pool');
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');


router.get('/admin', function (req, res) {

    res.render('admin', { 'message': '' });
});

router.get('/adminlogout', function (req, res) {
    localStorage.clear();
    res.render('admin', { 'message': '' });
});

router.post('/admincheck', function (req, res) {

    pool.query("select * from admin where (emailid=? ) and password=?",[req.body.emailid,req.body.pwd], function (error, result) {


        if (error) {
            console.log(error)
            res.render('admin', { 'message': 'server Error' })
        }
        else {

            if (result.length == 1) {
                localStorage.setItem('ADMIN',JSON.stringify(result[0]))
                res.render('dashboard', { data: result[0], 'message': 'succesfully' })

            }
            else {
                res.render('admin', {'message': 'Invalid emailid/password' })
            }

        }
    })
});
module.exports = router;