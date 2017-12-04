'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 3000;
const data = require('./db');
const players = data.players;
// console.log(Array.isArray( data.players));
console.log(Array.isArray(players));

app.disable('x-powered-by')
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/players', (req, res, next) => {
  res.status(200).send(data);
})

app.get('/players/:jersey', (req, res, next) => {
  const jn = req.params.jersey;
  const result = players.filter( (player) => player.jersey == jn);
  // console.log(result[0]);
  if (!result[0]) {
    res.status(404).send({error: 'Player not found! Please check your parameters & try again.'});
  }
  res.status(200).send(result);
})

app.post('/players', (req, res, next) => {
  const body = req.body;
  if (!body.id || !body.f_name || !body.l_name || !body.jersey || !body.position) {
    res.status(400).send({error: 'Invalid submission! Please try again.'});
  };
  res.status(200).send(body);
})

app.put('/players/:jersey', (req, res, next) => {
  const body = req.body;
  if (!body.id || !body.f_name || !body.l_name || !body.jersey || !body.position) {
    res.status(400).send({error: 'Invalid submission! Please try again.'});
  }; //make this better
})

app.delete('/players/:jersey', (req, res, next) => {
  const jersey = req.params.jersey;
  const result = players.filter( (player) => player.jersey == jn);
  // console.log(result[0]);
  if (!result[0]) {
    res.status(404).send({error: 'Player not found! Please check your parameters & try again.'});
  }
  res.status(200).send(result);
})

app.use((req, res, next) => {
  res.status(404).json({error: {error: "Resource not found. Please re-check your parameters and try again."}})
})

const listener = () => console.log(`Listening on port ${port}`);
app.listen(port, listener);
