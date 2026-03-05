import type { Schema, Struct } from '@strapi/strapi';

export interface AboutCoreValues extends Struct.ComponentSchema {
  collectionName: 'components_about_core_values';
  info: {
    displayName: 'coreValues';
    icon: 'star';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.String & Schema.Attribute.DefaultTo<'check-circle'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutHistory extends Struct.ComponentSchema {
  collectionName: 'components_about_histories';
  info: {
    displayName: 'history';
    icon: 'clock';
  };
  attributes: {
    detail: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'standard';
        }
      >;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutVision extends Struct.ComponentSchema {
  collectionName: 'components_about_visions';
  info: {
    displayName: 'vision';
    icon: 'eye';
  };
  attributes: {
    detail: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_shared_contact_infos';
  info: {
    description: 'Contact information block';
    displayName: 'Contact Info';
    icon: 'phone';
  };
  attributes: {
    icon: Schema.Attribute.String & Schema.Attribute.DefaultTo<'info-circle'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<
      ['address', 'email', 'phone', 'fax', 'website']
    > &
      Schema.Attribute.DefaultTo<'phone'>;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedNavLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_links';
  info: {
    description: 'Navigation menu link item';
    displayName: 'Nav Link';
    icon: 'bars';
  };
  attributes: {
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSectionHeader extends Struct.ComponentSchema {
  collectionName: 'components_shared_section_headers';
  info: {
    description: 'Reusable section title/subtitle block';
    displayName: 'Section Header';
    icon: 'heading';
  };
  attributes: {
    badge: Schema.Attribute.String;
    badgeIcon: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    description: 'Social media platform link';
    displayName: 'Social Link';
    icon: 'link';
  };
  attributes: {
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    platform: Schema.Attribute.Enumeration<
      [
        'facebook',
        'twitter',
        'instagram',
        'linkedin',
        'youtube',
        'tiktok',
        'whatsapp',
        'telegram',
      ]
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about.core-values': AboutCoreValues;
      'about.history': AboutHistory;
      'about.vision': AboutVision;
      'shared.contact-info': SharedContactInfo;
      'shared.nav-link': SharedNavLink;
      'shared.section-header': SharedSectionHeader;
      'shared.seo': SharedSeo;
      'shared.social-link': SharedSocialLink;
    }
  }
}
