var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

router.post('/flightsubmit',  function (req, res, next) {
    pool.query("insert into flight(flightname, flighttype, flightseat, flightdate, sourcecity, departuretime, destinationcity, arrivaltime, companyname,submitedat,updatedat,submitedby)values(?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.flightName, req.body.type, req.body.seats,req.body.Dt, req.body.source, req.body.departureTime, req.body.destination, req.body.arrivalTime,req.body.companyName ,req.body.submitedat, req.body.updatedat, req.body.submitedby], function (error, result) {
  
      if (error) {
        console.log(error)
        res.status(500).json({ status: false, message: 'Server error....' })
      }
      else {
        console.log(result)
        res.status(200).json({ status: true, message: 'Submited Succesfully' })
      }
  
  
    });
  });

//   fetch all source city
  router.get('/fetch_source_city', function (req, res) {
    pool.query('select * from sourcecities', function (error, result) {

        if (error) {
            res.status(500).json({ data: [], message: 'server error' })
        }
        else {
            console.log("source",result)
            res.status(200).json({ data: result, message: 'fetch succesfully' })
        }
    })
})
//   fetch all destination city
router.get('/fetch_destination_city', function (req, res) {
    pool.query('select * from destinationcities', function (error, result) {

        if (error) {
            res.status(500).json({ data: [], message: 'server error' })
        }
        else {
            console.log("destination",result)
            res.status(200).json({ data: result, message: 'fetch succesfully' })
        }
    })
})
//   fetch all flights
router.get('/fetch_all_flights', function (req, res) {
    pool.query('select * from flight', function (error, result) {

        if (error) {
            res.status(500).json({ data: [], message: 'server error' })
        }
        else {
            console.log("destination",result)
            res.status(200).json({ data: result, message: 'fetch succesfully' })
        }
    })
})

// *****edit flight***
router.post('/edit_flight_detail', function (req, res) {
    pool.query("update flight set  flightname=?, flighttype=?, flightseat=?, flightdate=?, sourcecity=?, departuretime=?, destinationcity=?, arrivaltime=?, companyname=?, updatedat=?, submitedby=? where flightid=? ", [req.body.flightName, req.body.type, req.body.seats,req.body.Dt, req.body.source, req.body.departureTime, req.body.destination, req.body.arrivalTime,req.body.companyName, req.body.updatedat, req.body.submitedby,req.body.flightid ], function (error, result) {
  
      if (error) {
        console.log(error)
        res.status(500).json({ status: false, message: " server error" })
      }
      else {
        console.log(result)
        res.status(200).json({ status: true, message: " updated succesfully" })
      }
    })
  });

//   ******delete flight***

router.post('/delete_flight_detail', (req, res) => {

    pool.query("delete from flight  where flightid=?", [req.body.flightid], function (error, result) {
  
      if (error) {
        console.log(error)
        res.status(500).json({ status: false, message: " server error" })
      }
      else {
        console.log(result)
        res.status(200).json({ status: true, data: result[0], message: " Deleted  succesfully" })
      }
  
    })
  
  
  });




















router.get('/showresult', function (req, res) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    if (!admin) {
        res.render('admin', { message: '' });
    }

    else {


        pool.query('select F.*,(select C.cityname from cities C where C.cityid=F.sourcecity) as source ,(select C.cityname from cities C where C.cityid=F.destinationcity) as destination from flight F', function (error, result) {

            if (error) {
                res.render('showresult', { 'data': [], 'message': 'server error' })
            }
            else {
                {
                    res.render('showresult', { 'data': result, 'message': 'succesfully' })
                }
            }
        })
    }
});

router.get('/showresult11', function (req, res) {
    pool.query('select F.*,(select C.cityname from cities C where C.cityid=F.sourcecity) as source ,(select C.cityname from cities C where C.cityid=F.destinationcity) as destination from flight F', function (error, result) {

        if (error) {
            res.render('showresult', { 'data': [], 'message': 'server error' })
        }
        else {
            {
                res.render('showresult', { 'data': result, 'message': 'succesfully' })
            }
        }
    })

});

router.get('/updatepage', function (req, res) {
    pool.query('select F.*,(select C.cityname from cities C where C.cityid=F.sourcecity) as source ,(select C.cityname from cities C where C.cityid=F.destinationcity) as destination from flight F where flightid=?', [req.query.fid], function (error, result) {

        if (error) {
            res.render('updatepage', { 'data': [], 'message': 'server error' })
        }
        else {
            {
                res.render('updatepage', { "data": result[0], 'message': 'succesfully' })
            }
        }
    })
});



router.get('/imgupdatepage', function (req, res) {
    pool.query('select F.*,(select C.cityname from cities C where C.cityid=F.sourcecity) as source ,(select C.cityname from cities C where C.cityid=F.destinationcity) as destination from flight F where flightid=?', [req.query.fid], function (error, result) {

        if (error) {
            res.render('imgupdatepage', { 'data': [], 'message': 'server error' })
        }
        else {
            {
                res.render('imgupdatepage', { "data": result[0], 'message': 'succesfully' })
            }
        }
    })
});




router.post('/flightsubmit', upload.single('Companylogo'), function (req, res) {
    var days = ("" + req.body.flightdays).replaceAll("'", '"')
    pool.query("insert into flight(flightname, flighttype, flightseat, flightdays, sourcecity, departuretime, destinationcity, arrivaltime, companyname, companylogo)values(?,?,?,?,?,?,?,?,?,?)", [req.body.flightname, req.body.flighttype, req.body.flightseat, days, req.body.sourcecity, req.body.departuretime, req.body.destinationcity, req.body.arrivaltime, req.body.companyname, req.file.originalname], function (error, result) {


        if (error) {
            console.log(error)
            res.render('flightinterface', { 'message': 'server Error' })
        }
        else {

            res.render('flightinterface', { 'message': 'submit succesfully' })
        }
    })
});





router.post('/uploadupdateimg', upload.single('Companylogo'), function (req, res) {

    pool.query("update  flight set companylogo=? where flightid=?", [req.file.originalname, req.body.flightid], function (error, result) {


        if (error) {

            res.redirect('/flight/showresult')
        }
        else {

            res.redirect('/flight/showresult')
        }
    })
});












module.exports = router;