import type { Schema, Struct } from '@strapi/strapi';

export interface HubDistrictAlert extends Struct.ComponentSchema {
  collectionName: 'components_hub_district_alerts';
  info: {
    description: 'Alert status for a specific district';
    displayName: 'District Alert';
  };
  attributes: {
    activeCases: Schema.Attribute.Integer & Schema.Attribute.Required;
    district: Schema.Attribute.String & Schema.Attribute.Required;
    lastUpdate: Schema.Attribute.String & Schema.Attribute.Required;
    status: Schema.Attribute.Enumeration<['normal', 'warning', 'critical']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'normal'>;
  };
}

export interface HubFacilityReport extends Struct.ComponentSchema {
  collectionName: 'components_hub_facility_reports';
  info: {
    displayName: 'Facility Report';
  };
  attributes: {
    district: Schema.Attribute.String & Schema.Attribute.Required;
    facilities: Schema.Attribute.Integer & Schema.Attribute.Required;
    rate: Schema.Attribute.Integer & Schema.Attribute.Required;
    reporting: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

export interface HubHealthCoverage extends Struct.ComponentSchema {
  collectionName: 'components_hub_health_coverages';
  info: {
    displayName: 'Health Coverage';
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#2563eb'>;
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<0>;
  };
}

export interface HubMonthlyData extends Struct.ComponentSchema {
  collectionName: 'components_hub_monthly_data';
  info: {
    displayName: 'Monthly Data';
  };
  attributes: {
    month: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<0>;
  };
}

export interface HubQuarterlyData extends Struct.ComponentSchema {
  collectionName: 'components_hub_quarterly_data';
  info: {
    displayName: 'Quarterly Data';
  };
  attributes: {
    period: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<0>;
    year: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

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
      'hub.district-alert': HubDistrictAlert;
      'hub.facility-report': HubFacilityReport;
      'hub.health-coverage': HubHealthCoverage;
      'hub.monthly-data': HubMonthlyData;
      'hub.quarterly-data': HubQuarterlyData;
      'shared.highlight': SharedHighlight;
      'shared.link-item': SharedLinkItem;
      'shared.service-card': SharedServiceCard;
      'shared.social-link': SharedSocialLink;
      'shared.stat-item': SharedStatItem;
    }
  }
}
