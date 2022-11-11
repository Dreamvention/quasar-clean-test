import { IAnnouncementsGateway } from 'domain/interfaces';
import { ApiRepository, PrimeRepository, CacheRepository } from '../repositories';
import { AnnouncementMap, LearningObjectMap } from '../mappers';
import { IAnnouncementData } from 'domain/entities';

export class AnnouncementsGateway implements IAnnouncementsGateway {
  constructor(
    public api: ApiRepository,
    public prime: PrimeRepository,
    public announcementMap: AnnouncementMap,
    public learningObjectMap: LearningObjectMap,
    public cache: CacheRepository
  ) {}
  async listAnnoncements(): Promise<IAnnouncementData[] | undefined> {
    return this.cache.load(
      'listAnnoncements',
      async (): Promise<IAnnouncementData[] | undefined> => {
        const { data } = (await this.api.slides.list()) || {};
        if (data) {
          const announcemnts = data;

          const ids = announcemnts.flatMap((a) => {
            const result: string[] = [];
            if (a.primaryAction == 'ENROLL_NOW' || a.primaryAction == 'GO_TO_COURSE') result.push(a.primaryActionUrl);
            if (a.secondaryAction == 'ENROLL_NOW' || a.primaryAction == 'GO_TO_COURSE')
              result.push(a.secondaryActionUrl);
            return result;
          });
          const learningObjectsResponse = await this.prime.learningObjects.listAll({
            ids,
          });
          const learningObjectsData = (learningObjectsResponse?.data || []).map((lo) =>
            this.learningObjectMap.toData(lo, learningObjectsResponse?.included || [])
          );
          return announcemnts.map((item) => this.announcementMap.toData(item, learningObjectsData));
        }
      },
      1000 * 10
    );
  }
}
