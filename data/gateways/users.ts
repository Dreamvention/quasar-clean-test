import { IUsersGateway } from 'domain/interfaces';
import { ApiRepository, PrimeRepository, CacheRepository } from '../repositories';
import { UserMap } from '../mappers';
import { IUserData, IUserFields } from 'domain/entities';

export class UsersGateway implements IUsersGateway {
  constructor(
    public cache: CacheRepository,
    public api: ApiRepository,
    public prime: PrimeRepository,
    public userMap: UserMap
  ) {}

  async getAccount(): Promise<IUserData | undefined> {
    const response = await this.prime.users.me<IUserFields>();
    if (!response?.data) return;
    const userResponse = await this.api.users.get(response?.data.id);

    if (userResponse?.data && userResponse?.data.length > 0) {
      return this.userMap.toData(response?.data, userResponse.data[0]);
    } else {
      return this.userMap.toData(response?.data);
    }
  }
}
