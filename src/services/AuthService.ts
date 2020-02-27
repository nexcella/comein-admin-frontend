export class AuthService {

  login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({token: '123123'}), 5000);
    });
  }

  logout() {
  }
}

export default new AuthService();
