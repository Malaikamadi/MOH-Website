export const REGULATOR_SLUGS = [
  'nhs',
  'pharmacy-board',
  'mdc',
  'ahpc',
] as const;

export type RegulatorSlug = (typeof REGULATOR_SLUGS)[number];

export function isRegulatorSlug(slug: string | undefined): slug is RegulatorSlug {
  return !!slug && (REGULATOR_SLUGS as readonly string[]).includes(slug);
}

export interface RegulatorData {
  slug: RegulatorSlug;
  acronym: string;
  fullName: string;
  icon: string;
  about: string;
  aboutExtra?: string;
  mandate: string;
  stats: {
    units: number;
    districts: number;
    staff: string;
    partners: string;
  };
  head: {
    name: string;
    title: string;
    credentials?: string;
    image?: string;
    bio: string[];
  };
  units: {
    id: string;
    name: string;
    icon: string;
    description: string;
    functions: string[];
  }[];
  contact: {
    email?: string;
    phone?: string;
    location?: string;
    website?: string;
  };
}

export const regulatorsData: Record<RegulatorSlug, RegulatorData> = {
  nhs: {
    slug: 'nhs',
    acronym: 'NHS',
    fullName: 'National Health Secretariat',
    icon: 'landmark',
    about:
      'The National Health Secretariat provides coordination and secretariat support for national health governance structures and multi-stakeholder platforms across Sierra Leone.',
    aboutExtra:
      'It convenes partners, tracks follow-up from sector meetings, and helps align the Ministry, agencies, and development partners on strategic health priorities.',
    mandate:
      'Coordinate national health governance processes and stakeholder engagement.',
    stats: {
      units: 2,
      districts: 16,
      staff: '40+',
      partners: '25+',
    },
    head: {
      name: 'To be confirmed',
      title: 'Secretary',
      bio: [
        'Leadership details will be updated by the Ministry Communications team.',
      ],
    },
    units: [
      {
        id: 'coordination',
        name: 'Sector Coordination',
        icon: 'handshake',
        description:
          'Convening partners, technical working groups, and inter-agency coordination for national health priorities.',
        functions: [
          'Secretariat support to sector meetings',
          'Technical working group coordination',
          'Action tracking and follow-up',
          'Partner reporting and alignment',
        ],
      },
      {
        id: 'secretariat',
        name: 'Secretariat Services',
        icon: 'folder-open',
        description:
          'Documentation, records, and administrative support for national health governance.',
        functions: [
          'Meeting records and minutes',
          'Scheduling and correspondence',
          'Document management',
          'Archives and institutional memory',
        ],
      },
    ],
    contact: {
      email: 'nhs@mohs.gov.sl',
      phone: '+232 76 460 440',
      location: 'Freetown, Sierra Leone',
    },
  },
  'pharmacy-board': {
    slug: 'pharmacy-board',
    acronym: 'Pharmacy Board',
    fullName: 'Pharmacy Board of Sierra Leone',
    icon: 'pills',
    about:
      'The Pharmacy Board of Sierra Leone regulates pharmacy practice, premises, and the supply of medicines to protect the public from unsafe or substandard pharmaceutical products and services.',
    aboutExtra:
      'It licenses pharmacists and pharmacy outlets, inspects premises, and enforces standards for wholesale and retail pharmaceutical services nationwide.',
    mandate:
      'Regulate pharmacy practice and medicine retail and wholesale to protect the public.',
    stats: {
      units: 3,
      districts: 16,
      staff: '45+',
      partners: '10+',
    },
    head: {
      name: 'To be confirmed',
      title: 'Registrar',
      bio: [
        'Leadership details will be updated by the Ministry Communications team.',
      ],
    },
    units: [
      {
        id: 'licensing',
        name: 'Licensing',
        icon: 'file-signature',
        description:
          'Licensing of pharmacists, pharmacy technicians, and premises across the country.',
        functions: [
          'Practitioner licences',
          'Premises permits',
          'Licence renewals',
          'Inspection of new outlets',
        ],
      },
      {
        id: 'inspection',
        name: 'Inspection & Enforcement',
        icon: 'search',
        description:
          'Compliance monitoring of pharmacy outlets and enforcement against illegal practice.',
        functions: [
          'Outlet inspections',
          'Enforcement actions',
          'Seizures of unsafe products',
          'Public safety alerts',
        ],
      },
      {
        id: 'education',
        name: 'Professional Standards',
        icon: 'book',
        description:
          'Pharmacy education, continuing professional development, and ethical practice.',
        functions: [
          'Continuing professional development',
          'Codes of ethics',
          'Practice guidelines',
          'Stakeholder engagement',
        ],
      },
    ],
    contact: {
      email: 'pharmacyboard@mohs.gov.sl',
      phone: '+232 76 460 440',
      location: 'Freetown, Sierra Leone',
    },
  },
  mdc: {
    slug: 'mdc',
    acronym: 'MDC',
    fullName: 'Medical and Dental Council',
    icon: 'stethoscope',
    about:
      'The Medical and Dental Council regulates medical and dental practice in Sierra Leone, including registration, licensing, and professional standards for doctors and dentists.',
    aboutExtra:
      'The Council protects the public by ensuring practitioners meet ethical and professional requirements, and by investigating complaints about professional conduct.',
    mandate:
      'Regulate medical and dental practice to safeguard patient safety and professional integrity.',
    stats: {
      units: 3,
      districts: 16,
      staff: '50+',
      partners: '12+',
    },
    head: {
      name: 'To be confirmed',
      title: 'Registrar',
      bio: [
        'Leadership details will be updated by the Ministry Communications team.',
      ],
    },
    units: [
      {
        id: 'registration',
        name: 'Registration & Licensing',
        icon: 'id-card',
        description:
          'Registration of medical and dental practitioners, licence renewals, and verification of qualifications.',
        functions: [
          'New practitioner registration',
          'Licence renewal',
          'Qualification verification',
          'Assessment of foreign qualifications',
        ],
      },
      {
        id: 'ethics',
        name: 'Ethics & Discipline',
        icon: 'balance-scale',
        description:
          'Professional conduct, complaints handling, and disciplinary processes.',
        functions: [
          'Investigations',
          'Hearings',
          'Sanctions',
          'Ethical guidance',
        ],
      },
      {
        id: 'standards',
        name: 'Practice Standards',
        icon: 'clipboard-list',
        description:
          'Clinical and ethical standards for safe medical and dental practice.',
        functions: [
          'Practice guidelines',
          'CPD requirements',
          'Inspections',
          'Public notices',
        ],
      },
    ],
    contact: {
      email: 'mdc@mohs.gov.sl',
      phone: '+232 76 460 440',
      location: 'Freetown, Sierra Leone',
    },
  },
  ahpc: {
    slug: 'ahpc',
    acronym: 'AHPC',
    fullName: 'Allied Health Professional Council',
    icon: 'users-cog',
    about:
      'The Allied Health Professional Council regulates allied health cadres, ensuring standards for registration, training, and ethical practice across Sierra Leone.',
    aboutExtra:
      'Covered professions may include laboratory scientists, radiographers, physiotherapists, and other allied cadres as defined by national regulation.',
    mandate:
      'Regulate allied health professions to ensure competence, ethics, and public safety.',
    stats: {
      units: 3,
      districts: 16,
      staff: '40+',
      partners: '12+',
    },
    head: {
      name: 'To be confirmed',
      title: 'Registrar',
      bio: [
        'Leadership details will be updated by the Ministry Communications team.',
      ],
    },
    units: [
      {
        id: 'registration',
        name: 'Multi-cadre Registration',
        icon: 'users',
        description:
          'Registration and licence management across allied health professions.',
        functions: [
          'Cadre registers',
          'Licence renewals',
          'Qualification verification',
          'Assessment of foreign qualifications',
        ],
      },
      {
        id: 'standards',
        name: 'Professional Standards',
        icon: 'clipboard-check',
        description:
          'Competency frameworks, scopes of practice, and ethical standards.',
        functions: [
          'Scopes of practice',
          'Continuing professional development',
          'Codes of ethics',
          'Practice guidance',
        ],
      },
      {
        id: 'education',
        name: 'Education Liaison',
        icon: 'university',
        description:
          'Links with training institutions to maintain quality education for allied health cadres.',
        functions: [
          'Curriculum input',
          'Accreditation support',
          'Examinations',
          'Workforce planning',
        ],
      },
    ],
    contact: {
      email: 'ahpc@mohs.gov.sl',
      phone: '+232 76 460 440',
      location: 'Freetown, Sierra Leone',
    },
  },
};

export const fallbackRegulators = REGULATOR_SLUGS.map((slug) => {
  const regulator = regulatorsData[slug];
  return {
    acronym: regulator.acronym,
    name: regulator.fullName,
    icon: regulator.icon,
    slug: regulator.slug,
  };
});
