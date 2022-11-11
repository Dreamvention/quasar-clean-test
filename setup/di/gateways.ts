import { object, use } from 'rsdi';
import { AuthGateway, UsersGateway, AnnouncementsGateway } from 'data/gateways';

export const gateways = {
  AuthGateway: object(AuthGateway).construct(use('CacheRepository'), use('AuthRepository'), use('AuthMap')),
  UsersGateway: object(UsersGateway).construct(
    use('CacheRepository'),
    use('ApiRepository'),
    use('PrimeRepository'),
    use('UserMap')
  ),
  AnnouncementsGateway: object(AnnouncementsGateway).construct(
    use('ApiRepository'),
    use('PrimeRepository'),
    use('AnnouncementMap'),
    use('LearningObjectMap'),
    use('CacheRepository')
  ),
};
