const express = require('express');
const routes = express.Router();
const instructors = require('./controllers/instructors');
const members = require('./controllers/members');

routes.get('/', (req,res) => {
  return res.redirect('/instructors');
});

routes.get('/instructors', instructors.index );

routes.get('/instructors/create', (req,res) => {
  return res.render('instructors/create');
});

routes.get('/instructors/:id',instructors.show);

routes.get('/instructors/:id/edit', instructors.edit);

routes.post('/instructors',instructors.post);

routes.put('/instructors', instructors.put);

routes.delete('/instructors', instructors.delete);

// MEMBERS

routes.get('/members',members.index);

routes.get('/members/create', members.create);


module.exports = routes;