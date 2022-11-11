import { IAuthGateway, IUsersGateway } from '../interfaces';
import { IAuthData, IUserData, DomainErrors, UserRoles } from '../entities';
export interface IAccountService {
  getAccount(): Promise<IUserData | undefined>;
  login(): Promise<IAuthData | undefined>;
  logout(): Promise<void>;
}
export class AccountService implements IAccountService {
  constructor(public authGateway: IAuthGateway, public usersGateway: IUsersGateway) {}

  async init(): Promise<IAuthData | undefined> {
    try {
      return await this.authGateway.init();
    } catch (error) {
      throw new DomainErrors.UserNotFound('init', { cause: error as Error });
    }
  }

  async login(): Promise<IAuthData | undefined> {
    try {
      return await this.authGateway.login();
    } catch (error) {
      throw new DomainErrors.UserNotFound('login', { cause: error as Error });
    }
  }

  async logout(): Promise<void> {
    try {
      await this.authGateway.logout();
    } catch (error) {
      throw new DomainErrors.UserNotFound('logout', { cause: error as Error });
    }
  }

  isAuthanticated(): boolean {
    try {
      return this.authGateway.isAuthanticated();
    } catch (error) {
      throw new DomainErrors.UserNotFound('isAuthanticated', { cause: error as Error });
    }
  }

  async getAccount(): Promise<IUserData | undefined> {
    try {
      const account = await this.usersGateway.getAccount();
      if (!account) throw new DomainErrors.NotAuthorized();
      return account;
    } catch (error) {
      throw new DomainErrors.UserNotFound('getAccount', { cause: error as Error });
    }
  }

  changeRole(role: UserRoles): void {
    try {
      return this.authGateway.changeRole(role);
    } catch (error) {
      throw new DomainErrors.UserNotFound('changeRole', { cause: error as Error });
    }
  }
}
