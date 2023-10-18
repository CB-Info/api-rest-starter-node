const morgan = require("morgan");
const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    authMiddleware = require('./middlewares/auth'),
    //authRoutes = require('./routes/auth'),
    connectionMongoDB = require('./mongoDB/connection'),
    restrictOrigin = require("./middlewares/restrictOrigin"),
    app = express();

connectionMongoDB()

app.use(cors());
app.use(bodyParser.json());
app.use(restrictOrigin);
app.use(morgan("dev"));

//Define the endpoint
app.get("/ping", (req, res) => {  
    return res.send({
      status: "Healthy",
    });
  });

//app.use('/api/auth', authMiddleware, authRoutes);

module.exports = app;