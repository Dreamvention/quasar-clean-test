import { IAuthGateway } from 'domain/interfaces';
import { CacheRepository, AuthRepository } from '../repositories';
import { AuthMap } from '../mappers';
import { IAuthData, UserRoles } from 'domain/entities';

export class AuthGateway implements IAuthGateway {
  constructor(public cache: CacheRepository, public auth: AuthRepository, public authMap: AuthMap) {}
  async init(): Promise<IAuthData | undefined> {
    const authResponse = await this.auth.init();
    if (authResponse) {
      return this.authMap.toData(authResponse);
    }
  }
  async login(): Promise<IAuthData | undefined> {
    const authResponse = this.auth.getAuth();
    if (authResponse) {
      return this.authMap.toData(authResponse);
    } else {
      this.auth.authenticate();
    }
  }
  async logout(): Promise<void> {
    await this.auth.logout();
  }
  isAuthanticated(): boolean {
    return !!this.auth.getAuth();
  }
  changeRole(role: UserRoles): void {
    this.auth.changeRole(role);
  }
}
