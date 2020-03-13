export class AuthService {

  login<T>(username: string, password: string): Promise<T> {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({token: '123123'} as unknown as T), 25000);
    });
  }

  logout() {
  }
}

export default new AuthService();
