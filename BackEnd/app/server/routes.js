var bodyParser = require('body-parser');
var AM = require('./modules/account-manager');
var cors=require('cors');
module.exports = function(app) {
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

	
app.post('/', function(req, res){
    AM.manualLogin(req.body['user'], req.body['pass'], function(e, o){
        if (!o){
            res.status(400).send(e);
        }else
            {
            res.status(200).send(o);
        }
    });
});

app.post('/signup', function(req, res){

    AM.addNewAccount({
        name 	: req.body['name'],
        email 	: req.body['email'],
        user 	: req.body['user'],
        pass	: req.body['pass'],

    }, function(e){
        if (e){
            res.status(400).send(e);
            console.log("error");
        } else{
            res.status(200).send('ok');
            console.log("Success")
        }
    });
});
};
