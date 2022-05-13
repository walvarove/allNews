import { IUser, LoginRequest, LoginResponse } from "../models/User";
import { ApiService } from "./api.service";

const AUTH_ENDPOINTS = {
    LOGIN: '/users/login',
    PROFILE: '/users/profile'
}

export class UsersService {

  static login({
    username,
    password,
  }: LoginRequest): Promise<LoginResponse> {
    return ApiService.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, {
      username,
      password,
    });
  }

  static getProfile() {
    return ApiService.get<IUser>(AUTH_ENDPOINTS.PROFILE)
  }

}