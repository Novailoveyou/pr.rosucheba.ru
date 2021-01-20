const express = require('express');
const sendMail = require('./mail');
const log = console.log;
const app = express();
const path = require('path');
// const geoip = require('geoip-lite');
const expressip = require('express-ip');
// const http = require('http');
// const ngrok = require('ngrok');
const compression = require('compression');

// var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//   console.log(ip);
// console.log(http.request);

// console.log(geoip.lookup(req.connection.remoteAddress));

const PORT = process.env.PORT || 80;

app.use(expressip().getIpInfoMiddleware);

app.use(compression());

app.use(express.static(__dirname + '/dist'));

// Data parsing
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

// field, uni, number, userName // question, contactWay, contact // userCity, userCountry // googleClientId // userDevice // utmSource, utmMedium, utmCampaign, utmContent, utmTerm // double
app.post('/email', (req, res) => {
  const ipInfo = req.ipInfo;
  console.log(ipInfo);
  // userCity = ipInfo.city;
  // userCountry = ipInfo.country;
  const {
    field,
    uni,
    number,
    userName,
    question,
    contactWay,
    contact,
    userCity,
    userCountry,
    googleClientId,
    userDevice,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    utmTerm,
    double
  } = req.body;
  console.log('Data: ', req.body);

  sendMail(
    field,
    uni,
    number,
    userName,
    question,
    contactWay,
    contact,
    userCity,
    userCountry,
    googleClientId,
    userDevice,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    utmTerm,
    double,
    function (err, data) {
      if (err) {
        res.status(500).json({
          message: 'Sorry ^.^ Internal Error',
        });
      } else {
        res.json({
          message: 'Email sent 👍',
        });
      }
    }
  );
});

app.get('/', (req, res) => {
  res.set('Content-Encoding', 'gzip');

  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  log('Server is starting on PORT, ', PORT);
});
