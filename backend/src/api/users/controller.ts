import { UserService } from './service';
import { Request, Response } from 'express';
import { LoginRequest } from './model';
import { User } from './dao';

export class UserController {

  static async login(req, res) {
    const { username, password }: LoginRequest = req.body;

    if (!username || !password) {
      return res
        .status(401)
        .json({ error: "username and password both required" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    if (!UserService.comparePasswords(password, user.password)) {
      return res
        .status(400)
        .send({ message: "username or password incorrect" });
    }

    const token = UserService.createJWToken(user);

    return res.status(200).send({
      accessToken: token,
    });
  }

  static async profile(req, res) {
    const user = await User.findById(req?.user?.id).select(
      "-novelties -password"
    );
    if (!user) {
      return res.status(404).send("User not exists");
    }
    return res.status(200).send(user);
  }
}


