const Authentication = require('./controllers/authentication');
const passportService = require('./server/passport');
const passport = require('passport');

// Models
const Newsletter = require('./models/newsletter');
const Request = require('./models/request');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false })

const bodyParser = require('body-parser');
const useBodyParser = bodyParser.json({ type: '*/*'});

const ejs = require('ejs');
var templateString = null;
var fs = require('fs');
var templateString = fs.readFileSync('./views/docs.ejs', 'utf-8');
// const fs = require('fs');

module.exports = (app) => {

    app.get('/', function(req, res) {

        res.send(ejs.render(templateString));
    })
    app.post('/signin', useBodyParser, requireSignin, Authentication.signin)
    app.post('/signup', useBodyParser, Authentication.signup)

    // Newsletters

    app.post('/newsletters/:id', function(req, res) {
        console.log(req.body)
        Newsletter.findOne({ _id: req.body.id }, (err, newsletter) => {
            if(err) { return next(err); }
            res.send({
                newsletter
            })
        });
    })

    app.get('/newsletters', function(req, res) {
        Newsletter.find({}, function(err, newsletters) {
            res.send(newsletters);
        })
    })

    app.post('/newsletters/new', function(req,res){

        var newNewsletter = new Newsletter();
        newNewsletter.title = req.body.title;
        newNewsletter.body = req.body.body
        newNewsletter.date = new Date();

        newNewsletter.imageUrl = req.file.filename;
        newNewsletter.save();
        res.send({
            success: true,
            message: 'saved newsletter',
            // data: fs.readFileSync(target_path, 'base64')
        })
    });
    
    app.post('/newsletters/edit/:id', function (req, res) {
        const id = req.params.id;
        Newsletter.findOne({ _id: id }, function (err, newsletter) {
            if (err) { return res.send(err); }
            newsletter.title = req.body.title;
            newsletter.body = req.body.body;
            newsletter.date = new Date();
            if(!req.body.image){
                newsletter.imageUrl = req.file.filename;
            }

            newsletter.save(); 

            res.send({
                success: true,
                message: 'saved newsletter'
                // data: fs.readFileSync(target_path, 'base64')
            })
        });

    });

    // Requests

    app.get('/requests', function(req, res) {
        Request.find({}, function(err, requests) {
            res.send(requests);
        })
    })


    app.post('/requests/update-status', useBodyParser, function(req, res) {
        const id = req.body._id;
        Request.findOne({ _id: id}, function(err, request) {
            if(err) { res.send(err) }
            const oldStatus = request.status;
            let newStatus = 'in-progress';
            switch(req.body.status){
              case 'pending':
                newStatus = 'in-progress';
                break;
              case 'in-progress':
                newStatus = 'complete';
                break;
              case 'complete':
                newStatus = 'pending';
                break;
            }
            request.status = newStatus;
            request.save();
            res.send({
                success: true,
                message: 'saved new status'
            })
        })
    })

    app.post('/requests/new', function(req, res) {

        const title = req.body.title;
        const body = req.body.body;
        const date = new Date(); // creation date
        const imageUrl = req.file.filename;
        const postedBy = req.body.postedBy;
        const status = 'pending'; // pending by default

        const request = new Request({
            title,
            body,
            date,
            imageUrl,
            postedBy,
            status
        })

        request.save();
        res.send({
            success: true,
            message: 'saved request'
        })
    })
}
