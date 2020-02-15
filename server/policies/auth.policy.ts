import httpStatus from "http-status";
import { verify } from "../services/auth.service";
import sendResponse from "../helpers/response";
import { Request, Response, NextFunction } from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  let tokenToVerify;
  const signature = req.header("Authorization");
  const content = signature ? signature.split(" ") : false;

  if (content && content.length === 2 && content[0] === "Bearer") {
    tokenToVerify = content[1];
  } else if (req.body.token) {
    tokenToVerify = req.body.token;
    delete req.body.token;
  }

  if (tokenToVerify) {
    return verify(tokenToVerify, err => {
      if (err) {
        return res
          .status(401)
          .json(
            sendResponse(
              httpStatus.UNAUTHORIZED,
              "Invalid Token",
              null,
              "Invalid Token"
            )
          );
      }
      return next();
    });
  }

  return res
    .status(401)
    .json(
      sendResponse(
        httpStatus.UNAUTHORIZED,
        "No Token found",
        null,
        "No Authorization found"
      )
    );
};
