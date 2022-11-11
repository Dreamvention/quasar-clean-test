import { LocaleTypes } from 'domain/entities';
import { ILocalizedMetadata } from '../repositories/prime';
export abstract class withLocale {
  constructor(public locale?: LocaleTypes) {}

  toLocale(data: ILocalizedMetadata[] | undefined): ILocalizedMetadata | undefined {
    if (data) {
      if (this.locale && data.filter((l) => l.locale === this.locale).length > 0) {
        return data.filter((l) => l.locale === this.locale)[0];
      }
      return data[0];
    }
  }
}
