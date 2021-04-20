// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
require('module-alias/register');
const { port, env } = require('@config/vars');
const app = require('@config/express');
const mongoose = require('@config/mongoose');
// open mongoose connection
mongoose.connect();

// listen to requests
let srv = app.listen(port, () => console.log(`server started on port ${port} (${env})`));


app.use('/peerjs', require('peer').ExpressPeerServer(srv, {
	debug: true
}))

/**
* Exports express
* @public
*/
module.exports = app;
