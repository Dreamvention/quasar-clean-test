import { IAnnouncementData } from 'domain/entities';

export interface IAnnouncementsGateway {
  listAnnoncements(): Promise<IAnnouncementData[] | undefined>;
}
