var express = require("express");
var cors = require("cors");
var createError = require("http-errors");
var busRoutes = require("./routes/busRoutes");

var app = express();

// Mount the busRoutes middleware
app.use(cors());
app.use("/api", busRoutes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // send error response
  res.status(err.status || 500).send({
    error: err.message || "Internal Server Error",
  });
});

module.exports = app;
