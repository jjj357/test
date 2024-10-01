var express = require('express');
var app = express();
var path = require('path');
const PORT = process.env.PORT || 3001;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/', function (req, res) {
    //res.json({ message: "Hello world!" });
      res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
   //res.sendFile(path.join(__dirname,"/../client/public/index.html"));
})

app.get("/api", (req, res) => {
  res.json({ message: "Hello from api server!" });
});


var server = app.listen(PORT, function () {
   console.log(`Server listening on ${PORT}`);
   console.log(`Express App running at http://127.0.0.1:${PORT}/`);
})