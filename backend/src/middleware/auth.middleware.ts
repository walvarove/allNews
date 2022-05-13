import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../api/users/dao';

export const authenticateToken = async (
  req,
  res,
  next
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(403).send("Access denied.");

    const { id: userId } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(userId);
    if(!user) {
      throw Error('Not user found');
    }
    req.user = user;
    next();
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
};