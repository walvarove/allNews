
const API_URL = 'http://localhost:4000/api';

export class ApiService {

  // Temp solution
  static accessToken;
  static get bearerToken() { return 'Bearer ' + this.accessToken; }

  static jsonStatusHandler<T>() {
    return async (response) => {
      if (response.status === 200) {
        return response.json() as Promise<T>;
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    }
  }

  static setAccessToken(accessToken: string) {
      this.accessToken = accessToken;
  }

  static async get<T>(path: string) {
    return fetch(API_URL + path, {
      method: "GET",
      mode: "cors",
      headers: {
        'Authorization': this.bearerToken,
        "Content-Type": "application/json",
      },
    }).then(this.jsonStatusHandler<T>());
  }

  static async post<T>(path: string, body: any) {
    return fetch(API_URL + path, {
      method: "POST",
      body: JSON.stringify(body),
      mode: "cors",
      headers: {
        'Authorization': this.bearerToken,
        "Content-Type": "application/json",
      },
    }).then(this.jsonStatusHandler<T>());
  }

  static async put<T>(path: string, body: any) {
    return fetch(API_URL + path, {
      method: "PUT",
      body: JSON.stringify(body),
      mode: "cors",
      headers: {
        'Authorization': this.bearerToken,
        "Content-Type": "application/json",
      },
    }).then(this.jsonStatusHandler<T>());
  }

  static async delete(path: string) {
    return fetch(API_URL + path, {
      method: "DELETE",
      mode: "cors",
      headers: {
        'Authorization': this.bearerToken,
        "Content-Type": "application/json",
      },
    });
  }
}


