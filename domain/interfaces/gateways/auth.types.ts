import { IAuthData, UserRoles } from 'domain/entities';

export interface IAuthGateway {
  init(): Promise<IAuthData | undefined>;
  login(): Promise<IAuthData | undefined>;
  logout(): Promise<void>;
  isAuthanticated(): boolean;
  changeRole(role: UserRoles): void;
}
