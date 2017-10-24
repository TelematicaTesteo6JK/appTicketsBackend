const routes = require('express').Router();
const Ninja = require('../../models/ninja');
const logger = require('logger').createLogger('./logs/development.log'); 

routes.get('/', function(req, res, next){
    Ninja.find({}).then(function(data){
        res.send(data);
    })
});


routes.post('/ninjas', function(req, res, next){
    Ninja.create(req.body).then(function(ninja){
        res.send(ninja);
    }).catch(next);
});


routes.put('/:id', function(req, res, next){
    Ninja.findByIdAndUpdate({ _id: req.params.id}, req.body).then(function(){
        Ninja.findOne({ _id: req.params.id}).then(function(ninja){
            res.send(ninja);
        });
    });
});


routes.delete('/:id', function(req, res, next){
    Ninja.findByIdAndRemove({ _id : req.params.id }).then(function(ninja){
        res.send(ninja);
    });
});

module.exports = routes;