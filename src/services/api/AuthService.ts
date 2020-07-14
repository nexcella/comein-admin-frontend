import {MyProfileResponse, UsernameLoginDto, UsernameLoginResponse, UsernameRegisterDto} from "@nexcella/comein-api";
import {NetworkService} from "../network/NetworkService";
import {UsernameRegisterResponse} from "@nexcella/comein-api/dist";

export class AuthService extends NetworkService {

  usernameLogin(data: UsernameLoginDto) {
    return this.transport.request<UsernameLoginResponse, UsernameLoginDto>('POST', '/auth/username', data);
  }

  usernameRegister(data: UsernameRegisterDto) {
    return this.transport.request<UsernameRegisterResponse, UsernameRegisterDto>('POST', '/register/username', data);
  }

  profile() {
    return this.transport.request<MyProfileResponse>('GET', '/profile/me')
  }
}
