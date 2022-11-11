import { IAnnouncementsGateway } from '../interfaces';
import { IAnnouncementData, DomainErrors } from '../entities';

export class AnnouncementsService {
  constructor(public announcementsGateway: IAnnouncementsGateway) {}

  async getAnnouncements(): Promise<IAnnouncementData[]> {
    try {
      return (await this.announcementsGateway.listAnnoncements()) || [];
    } catch (error) {
      throw new DomainErrors.AnnouncementNotFound('', { cause: error as Error });
    }
  }
}
