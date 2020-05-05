import { logger } from '@service-fw';
import config from 'config';

export const storage_logger = logger(`${config.get('service.name')}`);
