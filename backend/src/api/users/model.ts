import { Document } from "mongoose";
import { INovelty } from "../novelties/model";

export interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    novelties?: INovelty[];
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    userId: string;
    username: string;
    userEmail: string
}
