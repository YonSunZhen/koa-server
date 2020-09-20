import { logger } from '@service-fw';
import config from 'config';

export const test_logger = logger(`${config.get('service.name')}`);
