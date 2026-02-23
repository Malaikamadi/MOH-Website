import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * Sets up public API permissions so the frontend can read content.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Define which content types the public can READ
    const publicPermissions = [
      // Content types - public can find and findOne
      { controller: 'api::hero-slide.hero-slide', actions: ['find', 'findOne'] },
      { controller: 'api::news-article.news-article', actions: ['find', 'findOne'] },
      { controller: 'api::event.event', actions: ['find', 'findOne'] },
      { controller: 'api::publication.publication', actions: ['find', 'findOne'] },
      { controller: 'api::directorate.directorate', actions: ['find', 'findOne'] },
      { controller: 'api::disease-surveillance.disease-surveillance', actions: ['find', 'findOne'] },
      // Newsletter subscriber - public can CREATE (subscribe)
      { controller: 'api::newsletter-subscriber.newsletter-subscriber', actions: ['create'] },
    ];

    // Get the public role
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) {
      strapi.log.warn('Public role not found. Skipping permissions setup.');
      return;
    }

    // Set up each permission
    for (const perm of publicPermissions) {
      for (const action of perm.actions) {
        const existingPermission = await strapi
          .query('plugin::users-permissions.permission')
          .findOne({
            where: {
              action: `${perm.controller}.${action}`,
              role: publicRole.id,
            },
          });

        if (!existingPermission) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: `${perm.controller}.${action}`,
              role: publicRole.id,
              enabled: true,
            },
          });
          strapi.log.info(`✅ Enabled public permission: ${perm.controller}.${action}`);
        }
      }
    }

    strapi.log.info('🔓 Public API permissions configured successfully!');
  },
};
