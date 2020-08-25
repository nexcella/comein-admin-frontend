import {
  MyProfileResponse,
  UsernameForgotDto,
  UsernameForgotResponse,
  UsernameLoginDto,
  UsernameLoginResponse,
  UsernameRegisterDto,
  UsernameRegisterResponse
} from "@nexcella/comein-api";
import {NetworkService} from "../network/NetworkService";


export class AuthService extends NetworkService {

  usernameLogin(data: UsernameLoginDto) {
    return this.transport.request<UsernameLoginResponse, UsernameLoginDto>('POST', '/auth/username', data);
  }

  usernameRegister(data: UsernameRegisterDto) {
    return this.transport.request<UsernameRegisterResponse, UsernameRegisterDto>('POST', '/register/username', data);
  }

  usernameForgot(data: UsernameForgotDto) {
    return this.transport.request<UsernameForgotResponse, UsernameForgotDto>('POST', '/auth/usernameForgot', data);
  }

  profile() {
    return this.transport.request<MyProfileResponse>('GET', '/profile/me')
  }
}
