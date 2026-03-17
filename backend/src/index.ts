import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) { },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await setupPublicPermissions(strapi);
    await seedHeroSlides(strapi);
    await seedDirectorates(strapi);
    await seedSiteSettings(strapi);
    await seedHomepage(strapi);
    await seedAboutPage(strapi);
    await seedLeadershipMembers(strapi);
    await seedCommunicationsRole(strapi);
  },
};

// ─── Public Permissions ──────────────────────────────────────────

async function setupPublicPermissions(strapi: Core.Strapi) {
  const publicPermissions = [
    { controller: 'api::hero-slide.hero-slide', actions: ['find', 'findOne'] },
    { controller: 'api::news-article.news-article', actions: ['find', 'findOne'] },
    { controller: 'api::event.event', actions: ['find', 'findOne'] },
    { controller: 'api::publication.publication', actions: ['find', 'findOne'] },
    { controller: 'api::directorate.directorate', actions: ['find', 'findOne'] },
    { controller: 'api::disease-surveillance.disease-surveillance', actions: ['find', 'findOne'] },
    { controller: 'api::newsletter-subscriber.newsletter-subscriber', actions: ['create'] },
    // Single types — public can read
    { controller: 'api::site-setting.site-setting', actions: ['find'] },
    { controller: 'api::homepage.homepage', actions: ['find'] },
    { controller: 'api::about-page.about-page', actions: ['find'] },
    // Leadership members
    { controller: 'api::leadership-member.leadership-member', actions: ['find', 'findOne'] },
  ];

  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) {
    strapi.log.warn('Public role not found. Skipping permissions setup.');
    return;
  }

  for (const perm of publicPermissions) {
    for (const action of perm.actions) {
      const existing = await strapi
        .query('plugin::users-permissions.permission')
        .findOne({
          where: {
            action: `${perm.controller}.${action}`,
            role: publicRole.id,
          },
        });

      if (!existing) {
        await strapi.query('plugin::users-permissions.permission').create({
          data: {
            action: `${perm.controller}.${action}`,
            role: publicRole.id,
            enabled: true,
          },
        });
        strapi.log.info(`✅ Enabled: ${perm.controller}.${action}`);
      }
    }
  }
  strapi.log.info('🔓 Public API permissions configured.');
}

// ─── Seed: Hero Slides ───────────────────────────────────────────

async function seedHeroSlides(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::hero-slide.hero-slide').findMany({});
  if (existing.length > 0) {
    strapi.log.info(`📋 ${existing.length} hero slides exist, skipping.`);
    return;
  }

  strapi.log.info('🌱 Seeding hero slides...');
  const slides = [
    {
      title: 'Revolutionizing Healthcare',
      description: 'MoH Unveils State-of-the-Art Health Information System.',
      badge: 'National Health Information Hub',
      badgeIcon: 'shield-heart',
      primaryButtonText: 'View Details',
      primaryButtonLink: '/services',
      primaryButtonIcon: 'stethoscope',
      secondaryButtonText: 'Contact Us',
      secondaryButtonLink: '/contact',
      secondaryButtonIcon: 'phone',
      order: 1,
      isActive: true,
    },
    {
      title: 'Safe Motherhood for All',
      description: 'Comprehensive maternal health programs to ensure safe pregnancies, deliveries, and healthy babies across Sierra Leone.',
      badge: 'Maternal & Child Health',
      badgeIcon: 'baby',
      primaryButtonText: 'Maternal Health',
      primaryButtonLink: '#',
      primaryButtonIcon: 'heart',
      secondaryButtonText: 'Learn More',
      secondaryButtonLink: '/contact',
      secondaryButtonIcon: 'info-circle',
      order: 2,
      isActive: true,
    },
    {
      title: "Protecting Our Children's Future",
      description: 'Free vaccination programs reaching every child in Sierra Leone. Protecting communities through immunization.',
      badge: 'National Immunization Program',
      badgeIcon: 'syringe',
      primaryButtonText: 'Immunization Info',
      primaryButtonLink: '#',
      primaryButtonIcon: 'syringe',
      secondaryButtonText: 'Find a Clinic',
      secondaryButtonLink: '/contact',
      secondaryButtonIcon: 'calendar',
      order: 3,
      isActive: true,
    },
  ];

  for (const slide of slides) {
    try {
      await strapi.documents('api::hero-slide.hero-slide').create({
        data: slide as any,
        status: 'published',
      });
      strapi.log.info(`  ✅ Slide: ${slide.title}`);
    } catch (err: any) {
      strapi.log.error(`  ❌ Slide ${slide.title}: ${err.message}`);
    }
  }
  strapi.log.info('🌱 Hero slides seeded.');
}

// ─── Seed: Directorates ──────────────────────────────────────────

async function seedDirectorates(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::directorate.directorate').findMany({});
  if (existing.length > 0) {
    strapi.log.info(`📋 ${existing.length} directorates exist, skipping.`);
    return;
  }

  strapi.log.info('🌱 Seeding directorates...');
  const directorates = [
    {
      name: 'DPPI', fullName: 'Directorate of Policy, Planning & Information', slug: 'dppi', icon: 'chart-line',
      about: 'The Directorate of Policy, Planning and Information (DPPI) is responsible for leading health policy development, strategic planning, and managing health information systems across Sierra Leone.',
      aboutExtra: 'DPPI coordinates national health planning processes, monitors health sector performance, and provides evidence-based data for decision-making at all levels of the health system.',
      statsUnits: 7, statsDistricts: 16, statsStaff: '100+', statsPartners: '50+',
      directorName: 'Dr. Tom Sesay', directorCredentials: '',
      directorBio: ['The current director of DPPI, Dr. Tom Sesay is an experienced Medical Officer and Public Health Specialist with over 20 years of experience.', "Dr. Sesay's work spans from service delivery to development of health policies, strategies, and coordination of emergency responses.", 'He has served as Medical Superintendent in 2 district hospitals.'],
      units: [
        { id: 'ict', name: 'Information and Communication Technology (ICT)', icon: 'laptop', description: 'Managing ministry-wide IT infrastructure and digital health systems.', functions: ['Ministry IT infrastructure management', 'Digital health platforms development', 'Technical support to directorates', 'Cybersecurity implementation'] },
        { id: 'hmis', name: 'Health Management Information System (HMIS)', icon: 'database', description: 'Managing national health data systems.', functions: ['DHIS2 system management', 'Health data collection training', 'Health statistics production', 'Data quality assurance'] },
        { id: 'me', name: 'Monitoring & Evaluation (M&E)', icon: 'chart-bar', description: 'Tracking health program performance.', functions: ['M&E frameworks development', 'Program evaluations', 'Performance monitoring', 'Evaluation reports'] },
        { id: 'financing', name: 'Health Financing', icon: 'dollar-sign', description: 'Developing strategies for sustainable healthcare funding.', functions: ['Financing strategies', 'Health expenditure tracking', 'Budget planning support', 'Resource mobilization'] },
        { id: 'planning', name: 'Planning', icon: 'projectdiagram', description: 'Leading strategic planning efforts.', functions: ['National health strategic plans', 'District health planning', 'Program planning', 'Resource allocation planning'] },
        { id: 'coordination', name: 'Coordination', icon: 'handshake', description: 'Coordinating partnerships and development initiatives.', functions: ['Partner coordination', 'Development partner meetings', 'Program harmonization', 'Technical working groups'] },
        { id: 'policy', name: 'Policy', icon: 'file-contract', description: 'Developing and reviewing national health policies.', functions: ['Policy formulation', 'Policy review', 'Legislative support', 'Policy implementation guidance'] }
      ],
      contactEmail: 'dppi@mohs.gov.sl', contactPhone: '+232 76 460 440', contactLocation: '5th Floor, Youyi Building'
    },
    { name: 'RCH', fullName: 'Reproductive & Child Health', slug: 'rch', icon: 'baby', about: 'The RCH Directorate coordinates maternal, newborn, and child health services to reduce maternal and child mortality across Sierra Leone.', aboutExtra: 'We implement life-saving interventions including antenatal care, safe delivery, immunization, and nutrition programs.', statsUnits: 5, statsDistricts: 16, statsStaff: '1,200+', statsPartners: '40+', directorName: 'Desmond Maada Kangbai', directorCredentials: 'MPH, BSc Nursing', directorBio: ['Mr. Kangbai has over 15 years of experience in public health, specializing in maternal and child health programs.'], units: [{ id: 'epi', name: 'Expanded Program on Immunization', icon: 'syringe', description: 'Providing life-saving vaccines to all children.', functions: ['Routine immunization', 'Supplementary campaigns', 'Cold chain management', 'New vaccine introduction'] }, { id: 'rh', name: 'Reproductive Health Program', icon: 'heart', description: "Supporting women's health through family planning.", functions: ['Family planning services', 'Antenatal care', 'Safe delivery services', 'Postnatal care'] }, { id: 'school', name: 'School Health Program', icon: 'school', description: 'Promoting health among school-aged children.', functions: ['Health screening', 'Health education', 'Deworming programs', 'Vision/hearing tests'] }, { id: 'quality', name: 'Quality Management', icon: 'check-circle', description: 'Ensuring high-quality health services.', functions: ['Quality standards', 'Service audits', 'Staff training', 'Performance monitoring'] }, { id: 'child', name: 'Child Health Program', icon: 'baby', description: 'Reducing child morbidity and mortality.', functions: ['IMCI implementation', 'Newborn care', 'Nutrition support', 'Growth monitoring'] }], contactEmail: 'rch@mohs.gov.sl', contactPhone: '+232 76 460 440', contactLocation: '5th Floor, Youyi Building' },
    { name: 'PHC', fullName: 'Primary Health Care', slug: 'phc', icon: 'hospital', about: 'The PHC Directorate strengthens community-level health services and ensures equitable access to essential health care across all districts.', aboutExtra: 'PHC leads the implementation of the Basic Package of Essential Health Services (BPEHS) and coordinates community health worker programs.', statsUnits: 5, statsDistricts: 16, statsStaff: '800+', statsPartners: '35+', directorName: 'TBD', directorCredentials: '', directorBio: ['Director information to be updated.'], units: [{ id: 'community-health', name: 'Community Health Workers Program', icon: 'users', description: 'Managing community health workers.', functions: ['CHW recruitment and training', 'Community case management', 'Health promotion', 'CHW supervision'] }, { id: 'district-health', name: 'District Health Services', icon: 'hospital', description: 'Coordinating health service delivery across districts.', functions: ['District health planning', 'Facility supervision', 'Service delivery standards', 'Performance reviews'] }, { id: 'bpehs', name: 'Basic Package of Essential Health Services', icon: 'medkit', description: 'Ensuring delivery of essential health services.', functions: ['BPEHS implementation', 'Service package updates', 'Quality monitoring', 'Essential medicines coordination'] }, { id: 'nutrition', name: 'Nutrition Program', icon: 'apple-alt', description: 'Addressing malnutrition.', functions: ['Nutrition surveillance', 'Therapeutic feeding', 'Micronutrient supplementation', 'Infant feeding'] }, { id: 'health-education', name: 'Health Education & Promotion', icon: 'chalkboard-teacher', description: 'Promoting health literacy.', functions: ['Health awareness campaigns', 'Behavior change communication', 'IEC materials', 'Community engagement'] }], contactEmail: 'phc@mohs.gov.sl', contactPhone: '+232 76 460 440', contactLocation: '4th Floor, Youyi Building' },
    { name: 'DPC', fullName: 'Disease Prevention and Control', slug: 'dpc', icon: 'virus', about: "The DPC leads Sierra Leone's efforts in preventing, detecting, and controlling communicable and non-communicable diseases.", aboutExtra: 'DPC coordinates national disease surveillance, manages outbreak responses, and implements control programs for malaria, TB, HIV/AIDS, and NTDs.', statsUnits: 6, statsDistricts: 16, statsStaff: '500+', statsPartners: '45+', directorName: 'Dr. Sulaiman Lakoh', directorCredentials: 'MB, ChB, MSc, MPH, FCPS-SL, FWACP', directorBio: ['Dr. Lakoh is a Consultant Physician and Infectious Disease Specialist with 15+ years of experience.', 'He holds an MBBS from the University of Sierra Leone and is a Fellow of the West African College of Physicians.', 'He has published 102+ articles and ranks among the country\'s top infectious disease researchers.'], units: [{ id: 'surveillance', name: 'Disease Surveillance & Response', icon: 'search', description: 'Monitoring and responding to disease outbreaks.', functions: ['IDSR', 'Outbreak investigation', 'Event-based surveillance', 'Weekly epidemiological reporting'] }, { id: 'malaria', name: 'National Malaria Control Program', icon: 'bug', description: 'Reducing malaria morbidity and mortality.', functions: ['Net distribution', 'Indoor residual spraying', 'Case management', 'Seasonal chemoprevention'] }, { id: 'tb', name: 'National TB & Leprosy Program', icon: 'lungs', description: 'Controlling tuberculosis and leprosy.', functions: ['TB case finding', 'DOTS supervision', 'Drug-resistant TB management', 'Leprosy control'] }, { id: 'hiv', name: 'National HIV/AIDS Program', icon: 'ribbon', description: 'Managing the national HIV/AIDS response.', functions: ['HIV testing', 'ART', 'PMTCT', 'Key population interventions'] }, { id: 'ntd', name: 'Neglected Tropical Diseases Program', icon: 'microscope', description: 'Controlling and eliminating NTDs.', functions: ['Mass drug administration', 'Morbidity management', 'NTD surveillance', 'Vector control'] }, { id: 'ncd', name: 'Non-Communicable Diseases Program', icon: 'heartbeat', description: 'Addressing NCDs.', functions: ['NCD screening', 'Mental health services', 'Diabetes/hypertension control', 'Cancer prevention'] }], contactEmail: 'dpc@mohs.gov.sl', contactPhone: '+232 76 460 440', contactLocation: '5th Floor, Youyi Building' },
    { name: 'NEMS', fullName: 'National Emergency Medical Services', slug: 'nems', icon: 'ambulance', about: 'NEMS coordinates emergency medical response, ambulance services, and disaster health management across Sierra Leone.', aboutExtra: 'NEMS ensures rapid pre-hospital care, manages the national ambulance fleet, and operates the emergency call center.', statsUnits: 4, statsDistricts: 16, statsStaff: '300+', statsPartners: '20+', directorName: 'TBD', directorCredentials: '', directorBio: ['Director information to be updated.'], units: [{ id: 'ambulance', name: 'National Ambulance Service', icon: 'ambulance', description: 'Operating the national ambulance fleet.', functions: ['Emergency transport', 'Fleet management', 'Paramedic deployment', 'Inter-facility transfers'] }, { id: 'call-center', name: 'Emergency Call Center (117)', icon: 'phone-alt', description: 'Managing the emergency toll-free hotline.', functions: ['Emergency dispatch', 'Triage', 'Ambulance tracking', 'Public communication'] }, { id: 'disaster', name: 'Disaster Health Management', icon: 'shield-alt', description: 'Coordinating disaster preparedness and response.', functions: ['Disaster planning', 'Mass casualty response', 'Emergency coordination', 'Post-disaster assessment'] }, { id: 'training', name: 'Emergency Medical Training', icon: 'graduation-cap', description: 'Building capacity in emergency care.', functions: ['Paramedic training', 'First responder certification', 'Emergency protocols', 'Simulation exercises'] }], contactEmail: 'nems@mohs.gov.sl', contactPhone: '117', contactLocation: '4th Floor, Youyi Building' },
    { name: 'SS', fullName: 'Support Services', slug: 'ss', icon: 'cogs', about: 'The Support Services Directorate provides essential administrative, logistical, and operational support to ensure the effective functioning of the Ministry.', aboutExtra: 'Support Services manages human resources, financial operations, procurement, logistics, infrastructure maintenance, and general administration.', statsUnits: 5, statsDistricts: 16, statsStaff: '200+', statsPartners: '15+', directorName: 'TBD', directorCredentials: '', directorBio: ['Director information to be updated.'], units: [{ id: 'hr', name: 'Human Resources Management', icon: 'user-friends', description: 'Managing recruitment and deployment.', functions: ['Staff recruitment', 'Payroll management', 'Performance appraisals', 'Staff welfare'] }, { id: 'finance', name: 'Financial Management', icon: 'money-bill-wave', description: 'Overseeing budgeting and financial reporting.', functions: ['Budget execution', 'Financial reporting', 'Revenue management', 'Grant management'] }, { id: 'procurement', name: 'Procurement & Supply Chain', icon: 'boxes', description: 'Managing procurement of medical supplies.', functions: ['Medical supplies procurement', 'Equipment acquisition', 'Contract management', 'Supply chain coordination'] }, { id: 'logistics', name: 'Logistics & Transport', icon: 'truck', description: 'Coordinating transportation and distribution.', functions: ['Fleet management', 'Commodity distribution', 'Warehouse management', 'Last-mile delivery'] }, { id: 'admin', name: 'General Administration', icon: 'building', description: 'Administrative support and facility management.', functions: ['Office management', 'Infrastructure maintenance', 'Records management', 'Security'] }], contactEmail: 'ss@mohs.gov.sl', contactPhone: '+232 76 460 440', contactLocation: '4th Floor, Youyi Building' },
    { name: 'NM', fullName: 'Nursing and Midwifery', slug: 'nm', icon: 'user-nurse', about: 'The Directorate of Nursing and Midwifery provides leadership and strategic direction for nursing and midwifery services.', aboutExtra: 'We are responsible for nursing workforce development, professional standards, and ensuring quality nursing care.', statsUnits: 4, statsDistricts: 16, statsStaff: '8,000+', statsPartners: '15+', directorName: 'Chief Nursing Officer', directorCredentials: '', directorBio: ['The Chief Nursing Officer provides strategic leadership for nursing and midwifery services.'], units: [{ id: 'nursing', name: 'Nursing Services', icon: 'user-nurse', description: 'Quality nursing care across facilities.', functions: ['Nursing care delivery', 'Patient assessment', 'Wound care', 'Medication administration'] }, { id: 'midwifery', name: 'Midwifery Services', icon: 'baby', description: 'Safe and quality midwifery care.', functions: ['Antenatal care', 'Skilled birth attendance', 'Postnatal care', 'Newborn care'] }, { id: 'education', name: 'Nursing Education', icon: 'graduation-cap', description: 'Training nursing and midwifery professionals.', functions: ['Curriculum development', 'Student training', 'CPD', 'Quality assurance'] }, { id: 'standards', name: 'Professional Standards', icon: 'certificate', description: 'Setting professional standards.', functions: ['Practice standards', 'Licensing', 'Quality assurance', 'Professional conduct'] }], contactEmail: 'nm@mohs.gov.sl', contactPhone: '+232 76 460 440', contactLocation: '4th Floor, Youyi Building' },
    { name: 'NCD & MH', fullName: 'NCD & Mental Health', slug: 'ncdandmh', icon: 'brain', about: 'The Directorate of NCDs and Mental Health addresses the growing burden of NCDs and mental health conditions.', aboutExtra: 'We develop policies for prevention, treatment, and management of diabetes, hypertension, cancer, and mental health disorders.', statsUnits: 4, statsDistricts: 16, statsStaff: '8,000+', statsPartners: '15+', directorName: 'Director of NCD & Mental Health', directorCredentials: '', directorBio: ['The Director leads national efforts to prevent and control NCDs and improve mental health services.'], units: [{ id: 'diabetes', name: 'Diabetes Program', icon: 'tint', description: 'Screening, treatment, and management of diabetes.', functions: ['Diabetes screening', 'Patient monitoring', 'Community awareness', 'Treatment protocols'] }, { id: 'cardiovascular', name: 'Cardiovascular Health', icon: 'heartbeat', description: 'Prevention and management of cardiovascular conditions.', functions: ['Hypertension control', 'Stroke prevention', 'Cardiac care', 'Risk factor reduction'] }, { id: 'cancer', name: 'Cancer Prevention', icon: 'ribbon', description: 'Early detection and screening of cancers.', functions: ['Cervical cancer screening', 'Breast cancer awareness', 'Cancer registry', 'Treatment referral'] }, { id: 'mental-health', name: 'Mental Health Services', icon: 'brain', description: 'Community-based mental health care.', functions: ['Mental health assessment', 'Community-based care', 'Stigma reduction', 'Professional training'] }], contactEmail: 'ncd@mohs.gov.sl', contactPhone: '+232 76 460 440', contactLocation: '4th Floor, Youyi Building' },
    { name: 'PS', fullName: 'Pharmaceutical Services', slug: 'ps', icon: 'pills', about: 'The Directorate of Pharmaceutical Services ensures access to safe, effective, and quality medicines.', aboutExtra: 'We are responsible for drug regulation, supply chain management, and rational use of medicines.', statsUnits: 2, statsDistricts: 16, statsStaff: '8,000+', statsPartners: '15+', directorName: 'Director of Pharmaceutical Services', directorCredentials: '', directorBio: ['The Director leads national efforts to ensure access to safe and quality medicines.'], units: [{ id: 'medicines', name: 'Medicines', icon: 'pills', description: 'Distribution and management of medicines.', functions: ['Medicine distribution', 'Quality assurance', 'Inventory management', 'Product management'] }, { id: 'pharmaceuticals', name: 'Pharmaceuticals', icon: 'prescription-bottle', description: 'Management of pharmaceutical products.', functions: ['Product distribution', 'Quality assurance', 'Inventory management', 'Regulatory compliance'] }], contactEmail: 'ps@mohs.gov.sl', contactPhone: '+232 76 460 440', contactLocation: '4th Floor, Youyi Building' },
    { name: 'HRM', fullName: 'Human Resource Management', slug: 'hrm', icon: 'users', about: 'The Directorate of HRM is responsible for strategic management of human resources within the Ministry.', aboutExtra: 'We oversee recruitment, deployment, training, and retention of health workers.', statsUnits: 2, statsDistricts: 16, statsStaff: '8,000+', statsPartners: '15+', directorName: 'Director of Human Resource Management', directorCredentials: '', directorBio: ['The Director leads all HR functions including workforce planning and staff development.'], units: [{ id: 'recruitment', name: 'Recruitment & Deployment', icon: 'user-plus', description: 'Recruitment and deployment of health workers.', functions: ['Recruitment', 'Deployment', 'Transfer management', 'Staff records'] }, { id: 'training', name: 'Training & Development', icon: 'graduation-cap', description: 'Training of health workers.', functions: ['Training needs assessment', 'Scholarship management', 'CPD coordination', 'Training liaison'] }], contactEmail: 'hrm@mohs.gov.sl', contactPhone: '+232 76 460 440', contactLocation: '4th Floor, Youyi Building' },
    { name: 'TR', fullName: 'Training and Research', slug: 'tr', icon: 'book', about: 'The Directorate of Training and Research coordinates health worker training programs and health research.', aboutExtra: 'We oversee training programs and coordinate health research activities.', statsUnits: 2, statsDistricts: 16, statsStaff: '8,000+', statsPartners: '15+', directorName: 'Director of Training and Research', directorCredentials: '', directorBio: ['The Director leads training and research functions.'], units: [{ id: 'pre-service', name: 'Pre-Service Training', icon: 'graduation-cap', description: 'Pre-service training programs.', functions: ['Training programs', 'Curriculum development', 'Skills assessment', 'Continuing education'] }, { id: 'research', name: 'Health Research', icon: 'microscope', description: 'Health research coordination.', functions: ['Research coordination', 'Ethics review', 'Research dissemination', 'Capacity building'] }], contactEmail: 'tr@mohs.gov.sl', contactPhone: '+232 76 460 440', contactLocation: '4th Floor, Youyi Building' },
    { name: 'EHC', fullName: 'Environmental Health and Sanitation', slug: 'ehc', icon: 'leaf', about: 'The Directorate of Environmental Health and Sanitation protects public health through environmental interventions and hygiene promotion.', aboutExtra: 'We coordinate WASH activities and ensure healthy environmental conditions.', statsUnits: 4, statsDistricts: 16, statsStaff: '8,000+', statsPartners: '15+', directorName: 'Director of Environmental Health and Sanitation', directorCredentials: '', directorBio: ['The Director leads environmental health programs and WASH interventions.'], units: [{ id: 'wash', name: 'WASH', icon: 'tint', description: 'Safe water, sanitation, and hygiene.', functions: ['Water quality', 'Sanitation improvement', 'Hygiene promotion', 'Training'] }, { id: 'sanitation', name: 'Sanitation Improvement', icon: 'recycle', description: 'Promoting safe sanitation practices.', functions: ['Sanitation standards', 'Hygiene promotion'] }, { id: 'hygiene', name: 'Hygiene', icon: 'hand-sparkles', description: 'Promoting safe hygiene practices.', functions: ['Hygiene education', 'Sanitation awareness'] }, { id: 'inspection', name: 'Inspection', icon: 'search', description: 'Food safety and quality inspections.', functions: ['Food Safety', 'Food Quality'] }], contactEmail: 'ehc@mohs.gov.sl', contactPhone: '+232 76 460 440', contactLocation: '4th Floor, Youyi Building' },
    { name: 'FN', fullName: 'Food and Nutrition', slug: 'fn', icon: 'utensils', about: 'The Directorate of Food and Nutrition prevents and addresses malnutrition through evidence-based interventions.', aboutExtra: 'We focus on maternal and child nutrition, micronutrient supplementation, and healthy dietary practices.', statsUnits: 4, statsDistricts: 16, statsStaff: '8,000+', statsPartners: '15+', directorName: 'Director of Food and Nutrition', directorCredentials: '', directorBio: ['The Director leads national nutrition programs.'], units: [{ id: 'cmam', name: 'Community Management of Acute Malnutrition', icon: 'heartbeat', description: 'Treatment of acute malnutrition in children.', functions: ['Acute malnutrition treatment', 'IYCF', 'Micronutrient supplementation', 'Nutrition education'] }, { id: 'iycf', name: 'Infant and Young Child Feeding', icon: 'baby', description: 'Promoting optimal infant feeding practices.', functions: ['Breastfeeding promotion', 'Complementary feeding', 'Nutrition counseling'] }, { id: 'supplementation', name: 'Micronutrient Supplementation', icon: 'capsules', description: 'Providing essential micronutrients.', functions: ['Vitamin A', 'Iron/folic acid', 'Zinc supplementation'] }, { id: 'nutrition-education', name: 'Nutrition Education', icon: 'chalkboard-teacher', description: 'Promoting healthy dietary practices.', functions: ['Nutrition counseling', 'Diet education', 'Behavior change'] }], contactEmail: 'fn@mohs.gov.sl', contactPhone: '+232 76 460 440', contactLocation: '4th Floor, Youyi Building' },
  ];

  for (const dir of directorates) {
    try {
      await strapi.documents('api::directorate.directorate').create({ data: dir as any, status: 'published' });
      strapi.log.info(`  ✅ Directorate: ${dir.name}`);
    } catch (err: any) {
      strapi.log.error(`  ❌ Directorate ${dir.name}: ${err.message}`);
    }
  }
  strapi.log.info('🌱 Directorates seeded.');
}

// ─── Seed: Site Settings ─────────────────────────────────────────

async function seedSiteSettings(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::site-setting.site-setting').findFirst({});
  if (existing) {
    strapi.log.info('📋 Site settings exist, skipping.');
    return;
  }

  strapi.log.info('🌱 Seeding site settings...');
  await strapi.documents('api::site-setting.site-setting').create({
    data: {
      ministryName: 'Ministry of Health',
      ministryTagline: 'Sierra Leone',
      contactAddress: '4th & 5th Floor, Youyi Building, Freetown',
      contactEmail: 'info@mohs.gov.sl',
      contactPhone: '+232 76 460 440',
      socialLinks: [
        { platform: 'Facebook', url: 'https://facebook.com/mohsierraleone', icon: 'facebook-f' },
        { platform: 'Twitter', url: 'https://twitter.com/mohsierraleone', icon: 'twitter' },
        { platform: 'Instagram', url: 'https://instagram.com/mohsierraleone', icon: 'instagram' },
        { platform: 'LinkedIn', url: 'https://linkedin.com/company/mohsierraleone', icon: 'linkedin-in' },
        { platform: 'YouTube', url: 'https://youtube.com/mohsierraleone', icon: 'youtube' },
      ],
      mainNavigation: [
        { label: 'Home', url: '/', children: [] },
        { label: 'About MOH', url: '/about', children: [
          { label: 'Our History', url: '/about', icon: 'landmark' },
          { label: 'Leadership', url: '/about#leadership', icon: 'users-cog' },
          { label: 'Mission & Vision', url: '/about#mission', icon: 'bullseye' },
        ]},
        { label: 'Directorates', url: '/directorates', children: [
          { label: 'DPPI', url: '/directorates/dppi', icon: 'chart-line' },
          { label: 'Reproductive & Child Health', url: '/directorates/rch', icon: 'baby' },
          { label: 'Primary Health Care', url: '/directorates/phc', icon: 'heartbeat' },
          { label: 'Disease Prevention & Control', url: '/directorates/dpc', icon: 'virus-slash' },
          { label: 'Emergency Medical Services', url: '/directorates/nems', icon: 'ambulance' },
          { label: 'Support Services', url: '/directorates/ss', icon: 'cogs' },
          { label: 'Nursing & Midwifery', url: '/directorates/nm', icon: 'user-nurse' },
          { label: 'NCD & Mental Health', url: '/directorates/ncdandmh', icon: 'brain' },
          { label: 'Pharmaceutical Services', url: '/directorates/ps', icon: 'pills' },
          { label: 'Human Resource Management', url: '/directorates/hrm', icon: 'users' },
          { label: 'Training & Research', url: '/directorates/tr', icon: 'book' },
          { label: 'Environmental Health', url: '/directorates/ehc', icon: 'leaf' },
          { label: 'Food & Nutrition', url: '/directorates/fn', icon: 'utensils' },
        ]},
        { label: 'Media', url: '/media', children: [
          { label: 'Newsroom', url: '/newsroom', icon: 'rss' },
          { label: 'Events', url: '/events', icon: 'calendar-alt' },
          { label: 'Press Releases', url: '/press-releases', icon: 'bullhorn' },
        ]},
        { label: 'Contact Us', url: '/contact', children: [] },
        { label: 'Job Portal', url: '/jobs', children: [] },
      ],
      footerAboutText: 'The Ministry of Health is committed to ensuring accessible, equitable, and affordable healthcare for all Sierra Leoneans through efficient service delivery and strong health systems.',
      footerQuickLinks: [
        { label: 'About Us', url: '/about' },
        { label: 'Our Services', url: '/services' },
        { label: 'Newsroom', url: '/newsroom' },
        { label: 'Publications', url: '/publications' },
        { label: 'Careers', url: '/jobs' },
      ],
      footerServiceLinks: [
        { label: 'Hospital Services', url: '#' },
        { label: 'Emergency Services', url: '#' },
        { label: 'Maternal Health', url: '#' },
        { label: 'Child Health', url: '#' },
        { label: 'Disease Prevention', url: '#' },
      ],
      copyrightText: '© 2026 Ministry of Health, Sierra Leone. All rights reserved.',
      legalLinks: [
        { label: 'Privacy Policy', url: '/privacy' },
        { label: 'Terms of Use', url: '/terms' },
        { label: 'Accessibility', url: '/accessibility' },
      ],
    } as any,
    status: 'published',
  });
  strapi.log.info('🌱 Site settings seeded.');
}

// ─── Seed: Homepage ──────────────────────────────────────────────

async function seedHomepage(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::homepage.homepage').findFirst({});
  if (existing) {
    strapi.log.info('📋 Homepage exists, skipping.');
    return;
  }

  strapi.log.info('🌱 Seeding homepage...');
  await strapi.documents('api::homepage.homepage').create({
    data: {
      statsBar: [
        { value: '16', label: 'Districts Served', link: '/about#districts' },
        { value: '1,200+', label: 'Health Facilities', link: '/health-facilities' },
        { value: '100%', label: 'PHU Coverage', link: '/programs#phu' },
        { value: '85%', label: 'Vaccine Coverage', link: '/programs#vaccination' },
        { value: '$150M+', label: 'Health Investment', link: '/about#investments' },
        { value: '15K+', label: 'Healthcare Workers', link: '/directorates#workforce' },
        { value: '8M+', label: 'Citizens Covered', link: '/programs' },
      ],
      services: [
        { icon: 'hospital', title: 'Hospital Services', description: 'Access quality care at government hospitals and health centers across all 16 districts.', link: '#' },
        { icon: 'ambulance', title: 'Emergency Response', description: '24/7 National Emergency Medical Service (NEMS) providing ambulance and emergency care.', link: '#' },
        { icon: 'user-md', title: 'Medical Licensing', description: 'Registration and licensing for healthcare professionals and medical facilities.', link: '#' },
        { icon: 'heartbeat', title: 'Health Programs', description: 'Maternal health, child immunization, disease prevention and community health initiatives.', link: '#' },
      ],
      newsletterTitle: 'Stay Updated',
      newsletterSubtitle: 'Subscribe to receive the latest health news and ministry updates directly in your inbox.',
      newsletterButtonText: 'Subscribe',
      newsletterPlaceholder: 'Enter your email address',
    } as any,
    status: 'published',
  });
  strapi.log.info('🌱 Homepage seeded.');
}

// ─── Seed: About Page ────────────────────────────────────────────

async function seedAboutPage(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::about-page.about-page').findFirst({});
  if (existing) {
    strapi.log.info('📋 About page exists, skipping.');
    return;
  }

  strapi.log.info('🌱 Seeding about page...');
  await strapi.documents('api::about-page.about-page').create({
    data: {
      overviewBadge: 'Serving Sierra Leone Since 1961',
      overviewHeadline: 'Building a Healthier Sierra Leone',
      overviewLeadText: 'The Ministry of Health believes that access to sound health is a human right. Our vision is to ensure a functional national health system delivering efficient, high quality healthcare services.',
      overviewBodyText: 'We work in partnership with regulatory agencies, healthcare professionals, and international partners to provide effective health services and improve the health of our citizens.',
      highlights: [
        { icon: 'check-circle', title: 'Universal Coverage', description: 'Healthcare accessible to all citizens across 16 districts' },
        { icon: 'users', title: 'Community Health', description: '15,000+ grassroots health workers serving communities' },
        { icon: 'laptop-medical', title: 'Digital Transformation', description: 'Modern health technology and data-driven decisions' },
      ],
      stats: [
        { value: '1,200+', label: 'Health Facilities' },
        { value: '8M+', label: 'Citizens Served' },
        { value: '85%', label: 'Vaccine Coverage' },
        { value: '100+', label: 'Health Programs' },
      ],
      missionText: 'To provide leadership and coordination for the health sector in Sierra Leone, ensuring the delivery of quality, accessible, and affordable healthcare services to all citizens through efficient management, regulation, and partnership with stakeholders.',
      visionText: 'A healthy and productive Sierra Leone where every citizen has equitable access to quality healthcare services, enabling them to achieve their full potential and contribute to the socio-economic development of the nation.',
      coreValues: [
        { icon: 'heart', title: 'Compassion', description: 'We treat every citizen with dignity, empathy, and respect in all our healthcare interactions.' },
        { icon: 'shield-alt', title: 'Integrity', description: 'We uphold the highest ethical standards in healthcare delivery and resource management.' },
        { icon: 'award', title: 'Excellence', description: 'We strive for continuous improvement in the quality of healthcare services we provide.' },
        { icon: 'hands-helping', title: 'Collaboration', description: 'We work together with partners, communities, and stakeholders to achieve better health outcomes.' },
      ],
    } as any,
    status: 'published',
  });
  strapi.log.info('🌱 About page seeded.');
}

// ─── Seed: Leadership Members ────────────────────────────────────

async function seedLeadershipMembers(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::leadership-member.leadership-member').findMany({});
  if (existing.length > 0) {
    strapi.log.info(`📋 ${existing.length} leadership members exist, skipping.`);
    return;
  }

  strapi.log.info('🌱 Seeding leadership members...');
  const leaders = [
    {
      name: 'Dr. Austin Demby',
      position: 'Minister of Health',
      credentials: 'PhD, MSc, BSc',
      bio: 'Dr. Austin Demby serves as the Minister of Health for Sierra Leone. With extensive experience in public health and international development, he leads the country\'s health initiatives and policies aimed at improving healthcare access and quality for all Sierra Leoneans.',
      order: 1,
      isMinister: true,
      education: 'PhD in Public Health, MSc in Health Policy, BSc in Biomedical Sciences',
      experience: '15+ years in public health leadership and international development',
      focusAreas: 'Universal Health Coverage, Health System Strengthening, Primary Healthcare',
      stats: [
        { value: '15+', label: 'Years Experience' },
        { value: '100+', label: 'Initiatives Led' },
      ],
    },
    {
      name: 'Dr. Charlé J. Senessie',
      position: 'Deputy Minister 1',
      credentials: 'MD, MPH',
      bio: 'Dr. Charlé J. Senessie serves as Deputy Minister of Health, leading policy implementation and strategic health initiatives across Sierra Leone.',
      order: 2,
      isMinister: false,
      education: 'MD degree, Master of Public Health (MPH)',
      experience: '12+ years in health policy and administration',
      focusAreas: 'Policy Implementation, Health Sector Reform, Capacity Building',
      stats: [],
    },
    {
      name: 'Dr. Jalikatu Mustapha',
      position: 'Deputy Minister 2',
      credentials: 'MD, MPH',
      bio: 'Dr. Jalikatu Mustapha serves as Deputy Minister of Health, leading policy implementation and strategic health initiatives across Sierra Leone.',
      order: 3,
      isMinister: false,
      education: 'MD degree, Master of Public Health (MPH)',
      experience: '10+ years in health policy and public health leadership',
      focusAreas: 'Health Equity, Women and Child Health, Community Health Programs',
      stats: [],
    },
    {
      name: 'Dr. Sartie Kenneh',
      position: 'Chief Medical Officer',
      credentials: 'MD, FWACP',
      bio: 'Dr. Sartie Kenneh serves as the Chief Medical Officer, overseeing clinical standards and medical protocols for national healthcare delivery.',
      order: 4,
      isMinister: false,
      education: 'MD degree, Fellowship of West African College of Physicians',
      experience: '18+ years in clinical medicine and healthcare leadership',
      focusAreas: 'Clinical Standards, Medical Protocols, Healthcare Quality Assurance',
      stats: [],
    },
    {
      name: 'Mr. Andrew L. Sorie',
      position: 'Senior Permanent Secretary',
      credentials: 'MPA, BSc',
      bio: 'Mr. Andrew L. Sorie serves as the Senior Permanent Secretary, managing administrative operations and coordinating ministry functions.',
      order: 5,
      isMinister: false,
      education: 'Master of Public Administration, BSc in Business Administration',
      experience: '20+ years in public sector administration',
      focusAreas: 'Administrative Operations, Resource Management, Policy Coordination',
      stats: [],
    },
    {
      name: 'Dr. Mustapha Kabba',
      position: 'Deputy CMO',
      credentials: 'MD, MPH',
      bio: 'Dr. Mustapha Kabba serves as the Deputy Chief Medical Officer, supporting clinical leadership and healthcare quality improvement programs.',
      order: 6,
      isMinister: false,
      education: 'MD degree, Master of Public Health',
      experience: '14+ years in clinical practice and health systems',
      focusAreas: 'Quality Improvement, Clinical Leadership, Health Programs',
      stats: [],
    },
  ];

  for (const leader of leaders) {
    try {
      await strapi.documents('api::leadership-member.leadership-member').create({
        data: leader as any,
        status: 'published',
      });
      strapi.log.info(`  ✅ Leader: ${leader.name}`);
    } catch (err: any) {
      strapi.log.error(`  ❌ Leader ${leader.name}: ${err.message}`);
    }
  }
  strapi.log.info('🌱 Leadership members seeded.');
}

// ─── Seed: Communications Admin Role & User ─────────────────────

async function seedCommunicationsRole(strapi: Core.Strapi) {
  const adminRoleService = strapi.service('admin::role') as any;
  const adminUserService = strapi.service('admin::user') as any;

  // Check if role already exists
  const existingRoles = await adminRoleService.find();
  const commsRole = existingRoles.find((r: any) => r.name === 'Communications');

  let roleId: number;

  if (commsRole) {
    strapi.log.info('📋 Communications admin role exists, updating permissions...');
    roleId = commsRole.id;
  } else {
    strapi.log.info('🌱 Creating Communications admin role...');
    const newRole = await adminRoleService.create({
      name: 'Communications',
      code: 'strapi-communications',
      description: 'Media content management: news articles, events, and publications. For the Communications department.',
    });
    roleId = newRole.id;
  }

  const contentTypeFields: Record<string, string[]> = {
    'api::news-article.news-article': [
      'title', 'slug', 'summary', 'content', 'coverImage', 'gallery',
      'category', 'contentType', 'tags', 'author', 'publishedDate', 'featured', 'videoUrl',
    ],
    'api::event.event': [
      'title', 'slug', 'description', 'summary', 'location',
      'eventStartDate', 'eventEndDate', 'coverImage', 'registrationLink', 'organizer', 'featured',
    ],
    'api::publication.publication': [
      'title', 'description', 'category', 'file', 'coverImage',
      'publishDate', 'year', 'directorate',
    ],
  };

  const crudActions = ['create', 'read', 'update', 'delete', 'publish'];

  const permissions: any[] = [];

  for (const [uid, fields] of Object.entries(contentTypeFields)) {
    for (const action of crudActions) {
      permissions.push({
        action: `plugin::content-manager.explorer.${action}`,
        subject: uid,
        properties: { fields, locales: [] },
        conditions: [],
      });
    }
  }

  // Read-only access to directorates (needed for Publication relation dropdown)
  const directorateFields = [
    'name', 'fullName', 'slug', 'icon', 'about', 'aboutExtra',
    'statsUnits', 'statsDistricts', 'statsStaff', 'statsPartners',
    'directorName', 'directorCredentials', 'directorImage', 'directorBio',
    'units', 'contactEmail', 'contactPhone', 'contactLocation', 'publications',
  ];
  permissions.push({
    action: 'plugin::content-manager.explorer.read',
    subject: 'api::directorate.directorate',
    properties: { fields: directorateFields, locales: [] },
    conditions: [],
  });

  // Upload / media library permissions
  permissions.push(
    { action: 'plugin::upload.read', subject: null, properties: {}, conditions: [] },
    { action: 'plugin::upload.assets.create', subject: null, properties: {}, conditions: [] },
    { action: 'plugin::upload.assets.update', subject: null, properties: {}, conditions: ['admin::is-creator'] },
    { action: 'plugin::upload.assets.download', subject: null, properties: {}, conditions: [] },
    { action: 'plugin::upload.assets.copy-link', subject: null, properties: {}, conditions: [] },
  );

  // Content-manager configuration permissions (required to view collection types)
  for (const uid of [...Object.keys(contentTypeFields), 'api::directorate.directorate']) {
    permissions.push({
      action: 'plugin::content-manager.collection-types.configure-view',
      subject: uid,
      properties: {},
      conditions: [],
    });
  }

  // Content-type-builder read permission (needed for the admin sidebar)
  permissions.push(
    { action: 'plugin::content-type-builder.read', subject: null, properties: {}, conditions: [] },
  );

  try {
    await adminRoleService.assignPermissions(roleId, permissions);
    strapi.log.info('✅ Communications admin role permissions configured.');
  } catch (err: any) {
    strapi.log.error(`❌ Failed to assign Communications role permissions: ${err.message}`);
  }

  await seedCommunicationsUser(strapi, roleId);
}

async function seedCommunicationsUser(strapi: Core.Strapi, roleId: number) {
  const existingUser = await strapi.query('admin::user').findOne({
    where: { email: 'comms@mohs.gov.sl' },
  });

  if (existingUser) {
    strapi.log.info('📋 Communications admin user exists, updating password...');
    const hashedPassword = await strapi.service('admin::auth').hashPassword('Comms2026!');
    await strapi.query('admin::user').update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    });
    strapi.log.info('✅ Communications admin user password updated.');
    return;
  }

  strapi.log.info('🌱 Creating Communications admin user...');

  try {
    const hashedPassword = await strapi.service('admin::auth').hashPassword('Comms2026!');
    await strapi.query('admin::user').create({
      data: {
        email: 'comms@mohs.gov.sl',
        firstname: 'Communications',
        lastname: 'Team',
        password: hashedPassword,
        isActive: true,
        blocked: false,
        registrationToken: null,
        roles: [roleId],
      },
    });
    strapi.log.info('✅ Communications admin user created (comms@mohs.gov.sl / Comms2026!).');
  } catch (err: any) {
    strapi.log.error(`❌ Failed to create Communications user: ${err.message}`);
  }
}
