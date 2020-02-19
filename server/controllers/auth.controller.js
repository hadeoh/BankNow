import db from '../src/models';
import sendResponse from '../helpers/response';
import {hashPassword} from '../services/bcrypt.service';
import * as tokenizer from '../services/auth.service';
import httpStatus from 'http-status';

export const createUser = async (req, res, next) => {

  let { email, fullName, phoneNumber, password } = req.body;
  try {
    const hashedpassword = await hashPassword(password);
    password = hashedpassword;

    let user = await db.User.create({ email, fullName, phoneNumber, password });

    const payLoad = { id:user.id, email }; // when loggin in a user
    const token = tokenizer.issue(payLoad);
    user = { user, token }
    return res.status(httpStatus.CREATED).json(sendResponse(httpStatus.CREATED, 'success', user, null))
  } catch (error) {
    next(error)
  }

}