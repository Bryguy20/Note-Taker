const express = require("express");
// all the require and the import of the other js files
const apiRoutes = require('./routes/apiRoutes.js');
const htmlRoutes = require('./routes/htmlRoutes.js');


// the express server 
var app = express();

//set PORT
var PORT = process.env.PORT || 3001;




app.use(express.urlencoded({ extended: true}));
//also the JSON file
app.use(express.json());

app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
// the localhost that will be 3001 
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT} 🚀`)
});


