import { Response } from "express";

export const httpError = (res: Response, err: Error) => {
    res.status(500);
    res.send({ error: 'Something went wrong' });
}