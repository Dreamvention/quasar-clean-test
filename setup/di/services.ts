import { object, use } from 'rsdi';
import { AccountService, AnnouncementsService } from 'domain/services';

export const services = {
  AccountService: object(AccountService).construct(use('AuthGateway'), use('UsersGateway')),
  AnnouncementsService: object(AnnouncementsService).construct(use('AnnouncementsGateway')),
};
