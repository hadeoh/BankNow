import bcrypt from "bcryptjs";
import config from "../config";

interface userObj {
  id: number,
  email: string,
  fullName: string,
  password: string,
  userType: string,
  createdAt: Date,
  updatedAt: Date,
  adminType: string
}
export const hashPassword = (user: userObj) => {
  const hash = bcrypt.genSaltSync(config.bcryptSalt);
  return bcrypt.hash(user.password, hash);
};

export const comparePassword = (password:string, hash:string) => bcrypt.compare(password, hash);