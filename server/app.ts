import createError, { HttpError } from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import config from "./config";
import * as error from "./config/error";

const app = express();

if (config.env === "development") {
  app.use(logger("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// when a random route is inputed
app.get("/", (_req, res) =>
  res.status(200).json({
    statusCode: 200,
    status: "success",
    message: "Welcome to BankNow API."
  })
);

// catch 404 and forward to error handler
app.use(function(_req: Request, _res: Response, next: NextFunction) {
  next(createError(404));
});

// mount all routes on root /api/v1 path
// app.use('/api/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use(function() {
  error.converter;
});

// catch 404 and forward to error handler
app.use(function() {
  error.notFound;
});

// error handler, send stacktrace only during development
app.use(function() {
  error.handler;
});

// error handler
app.use(function(
  err: HttpError,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
