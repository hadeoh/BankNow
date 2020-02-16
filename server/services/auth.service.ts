import jwt, { VerifyCallback } from 'jsonwebtoken';
import config from '../config';

const secret = config.env === 'production' ? config.jwtSecret : 'secret';

export const issue = (payload: any) => jwt.sign(payload, secret, { expiresIn: 86400 });

export const verify = (token: string, cb: VerifyCallback) => jwt.verify(token, secret, cb);