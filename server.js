//Install express server
const express = require('express');
const path = require('path');
const enforce = require('express-sslify');

const app = express();

app.use(enforce.HTTPS({ trustProtoHeader: true }));

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/taci'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/taci/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

app.use((req, res, next) => {
  if(req.secure){
    next();
  }
  else {
    res.redirect(301, 'https://www.sursa.eu');
  }
})
