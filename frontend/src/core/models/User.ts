import { INovelty } from "./Novelty";

export interface IUser {
    _id: string;
    username: string;
    email: string;
    novelties?: INovelty[];
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    userId: string;
    username: string;
    userEmail: string
}
