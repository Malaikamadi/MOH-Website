import type { Schema, Struct } from '@strapi/strapi';

export interface SharedHighlight extends Struct.ComponentSchema {
  collectionName: 'components_shared_highlights';
  info: {
    description: 'A highlight/value with icon, title, and description';
    displayName: 'Highlight';
    icon: 'star';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLinkItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_link_items';
  info: {
    description: 'A label-url pair for navigation links';
    displayName: 'Link Item';
    icon: 'link';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedServiceCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_cards';
  info: {
    description: 'A service card with icon, title, description, and link';
    displayName: 'Service Card';
    icon: 'grid';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    description: 'A social media platform link';
    displayName: 'Social Link';
    icon: 'earth';
  };
  attributes: {
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    platform: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedStatItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_stat_items';
  info: {
    description: 'A statistic with a value and label';
    displayName: 'Stat Item';
    icon: 'chartLine';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    link: Schema.Attribute.String;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.highlight': SharedHighlight;
      'shared.link-item': SharedLinkItem;
      'shared.service-card': SharedServiceCard;
      'shared.social-link': SharedSocialLink;
      'shared.stat-item': SharedStatItem;
    }
  }
}
