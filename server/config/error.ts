import httpStatus from "http-status";
import { isCelebrate } from "celebrate";
import config from "./index";

import APIError from "../helpers/APIError";

import JoiErrorFormatter from "../helpers/JoiErrorFormatter";
import { HttpError } from "http-errors";
import { NextFunction } from "express";

/**
 * Error handler. Send stacktrace only during development
 * @public
 */

export const handler = (
  err: any,
  _req: Request,
  res: any,
  _next: NextFunction
) => {
  const response = {
    statusCode: err.status,
    message: err.message || "Something went wrong",
    errors: err.errors,
    payload: null,
    stack: err.stack
  };
  if (config.env !== "development") {
    delete response.stack;
  }

  res.status(err.status).json(response);
};

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
export const converter = (
  err: HttpError,
  req: Request,
  res: any,
  _next: NextFunction
) => {
  let convertedError;
  if (isCelebrate(err)) {
    convertedError = new APIError({
      message: "Invalid fields",
      status: httpStatus.BAD_REQUEST, //unprocessible entity
      errors: JoiErrorFormatter(err.joi.details) || {},
      isPublic: false,
      stack: null,
      payload: null
    });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack,
      errors: err,
      isPublic: false,
      payload: null
    });
  }

  return handler(convertedError, req, res, _next);
};

/**
 *
 * @param {Error} err
 * @param {} req
 * @param {*} res
 */
export const errorHandler = (
  err: HttpError,
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (err) {
    const tokenError = new APIError({
      message: "Unauthorized",
      status: err.status,
      isPublic: true,
      stack: null,
      errors: err,
      payload: null
    });
    next(tokenError);
  }
  next();
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
export const notFound = (
  err: HttpError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const error = new APIError({
    message: "Not found",
    status: httpStatus.NOT_FOUND,
    isPublic: true,
    stack: null,
    errors: err,
    payload: null
  });
  return handler(error, req, res, _next);
};
