const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const { join } = require('path');
const router = require('./routers');

const app = express();

app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(join(__dirname, '..', 'public')));
app.use(router);
app.set('port', process.env.PORT || 3000);

app.use((req, res) => {
  res.sendFile(join(__dirname, '..', 'public', '404', 'index.html'));
});

app.use((err, req, res, next) => {
  res.sendFile(join(__dirname, '..', 'public', '500', 'index.html'));
});

module.exports = app;
