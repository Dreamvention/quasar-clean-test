import { IUserData } from 'domain/entities';

export interface IUsersGateway {
  getAccount(): Promise<IUserData | undefined>;
}
