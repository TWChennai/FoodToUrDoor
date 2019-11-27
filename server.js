
//Install express server
const express = require('express');
var cors = require('cors')

const app = express();
app.use(cors())

app.use(express.static(__dirname + '/dist/FoodToUrDoor'));
console.log(__dirname)

app.all('/*', function(req, res, next) {
    res.sendFile('index.html', { root: __dirname + "/dist/FoodToUrDoor/" });
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);