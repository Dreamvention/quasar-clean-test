import DIContainer from 'rsdi';

import { config } from './config';
import { mappers } from './mappers';
import { repositories } from './repositories';
import { gateways } from './gateways';
import { services } from './services';

export default function configureDI() {
  const container = new DIContainer();
  container.add({
    ...config,
    ...mappers,
    ...repositories,
    ...gateways,
    ...services,
  });
  return container;
}

export const container = configureDI();
