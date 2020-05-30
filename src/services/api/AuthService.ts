import {UsernameLoginDto, UsernameLoginResponse, MyProfileResponse} from "@nexcella/comein-api";
import {NetworkService} from "../network/NetworkService";

export class AuthService extends NetworkService {

  usernameLogin(data: UsernameLoginDto): Promise<UsernameLoginResponse> {
    return this.transport.request<UsernameLoginResponse, UsernameLoginDto>('POST', '/auth/username', data);
  }

  profile() {
    return this.transport.request<MyProfileResponse>('GET', '/profile/me')
  }
}
