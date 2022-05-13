import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from './dao';
import { IUser } from "./model";

export class UserService {
  static comparePasswords(inputPassword, userPassword) {
    return bcrypt.compareSync(inputPassword, userPassword);
  }

  static createJWToken(user: IUser) {
    return jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: 86400, // 24 hours
      }
    );
  }

  static async removeNovelty(userId: string, noveltyId: string) {
    const user = await User.findById(userId);
    if (!user) {
      throw Error('Not user found');
    }
    await User.findByIdAndUpdate(
      userId,
      {
        $pullAll: {
          novelties: [{ _id: noveltyId }],
        },
      }
    );
    await user.save();
  }
}

