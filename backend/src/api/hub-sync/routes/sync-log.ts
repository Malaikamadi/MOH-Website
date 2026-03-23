/**
 * Sync log routes - admin only, for viewing audit logs
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::hub-sync.sync-log');
