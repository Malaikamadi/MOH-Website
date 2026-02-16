export interface DirectorateData {
    acronym: string;
    fullName: string;
    icon: string;
    about: string;
    aboutExtra?: string;
    stats: {
        units: number;
        districts: number;
        staff: string;
        partners: string;
    };
    director: {
        name: string;
        credentials?: string;
        image: string;
        bio: string[];
    };
    units: {
        id: string;
        name: string;
        icon: string;
        description: string;
        functions: string[];
    }[];
    documents?: {
        title: string;
        type: string;
        size: string;
        link: string;
    }[];
    contact?: {
        email?: string;
        phone?: string;
        location?: string;
    };
}

export const directoratesData: Record<string, DirectorateData> = {
    dppi: {
        acronym: 'DPPI',
        fullName: 'Directorate of Policy, Planning & Information',
        icon: 'chart-line',
        about: 'The Directorate of Policy, Planning and Information (DPPI) is responsible for leading health policy development, strategic planning, and managing health information systems across Sierra Leone.',
        aboutExtra: 'DPPI coordinates national health planning processes, monitors health sector performance, and provides evidence-based data for decision-making at all levels of the health system.',
        stats: {
            units: 7,
            districts: 16,
            staff: '100+',
            partners: '50+'
        },
        director: {
            name: 'Dr. Tom Sesay',
            image: '/images/directorates/dir_dppi.png',
            bio: [
                'The current director of Policy, Planning and Information of the Ministry of Health in Sierra Leone, Dr. Tom Sesay is an experienced Medical Officer and Public Health Specialist with over 20 years of experience in the health services in Sierra Leone, during which he has served in various capacities in the Ministry of Health.',
                'Dr. Sesay\'s work In the health sector has spanned from service delivery at the national and district level to development of health policies, strategies, Health legislature, to coordination of emergency responses.',
                'In his period of service, Dr. Sesay has worked in various capacities including serving as the technical and administrative head (Medical Superintendent) in 2 district hospitals- Pujehun hospital for 6 years (2003-2008 and Kabala Hospital for a year, 2008-2009.'
            ]
        },
        units: [
            {
                id: 'ict',
                name: 'Information and Communication Technology (ICT)',
                icon: 'laptop',
                description: 'Managing ministry-wide IT infrastructure and digital health systems.',
                functions: [
                    'Ministry IT infrastructure management',
                    'Digital health platforms development',
                    'Technical support to directorates',
                    'Cybersecurity implementation'
                ]
            },
            {
                id: 'hmis',
                name: 'Health Management Information System (HMIS)',
                icon: 'database',
                description: 'Managing national health data systems for evidence-based decision making.',
                functions: [
                    'DHIS2 system management',
                    'Health data collection training',
                    'Health statistics production',
                    'Data quality assurance'
                ]
            },
            {
                id: 'me',
                name: 'Monitoring & Evaluation (M&E)',
                icon: 'chart-bar',
                description: 'Tracking health program performance for continuous improvement.',
                functions: [
                    'M&E frameworks development',
                    'Program evaluations',
                    'Performance monitoring',
                    'Evaluation reports'
                ]
            },
            {
                id: 'financing',
                name: 'Health Financing',
                icon: 'dollar-sign',
                description: 'Developing strategies for sustainable healthcare funding.',
                functions: [
                    'Financing strategies',
                    'Health expenditure tracking',
                    'Budget planning support',
                    'Resource mobilization'

                ]
            },
            {
                id: 'planning',
                name: 'Planning',
                icon: 'projectdiagram',
                description: 'Leading strategic planning efforts for the health sector.',
                functions: [
                    'National health strategic plans',
                    'District health planning',
                    'Program planning',
                    'Resource allocation planning'
                ]
            },
            {
                id: 'coordination',
                name: 'Coordination',
                icon: 'handshake',
                description: 'Coordinating partnerships and development initiatives.',
                functions: [
                    'Partner coordination',
                    'Development partner meetings',
                    'Program harmonization',
                    'Technical working groups'
                ]
            },
            {
                id: 'policy',
                name: 'Policy',
                icon: 'file-contract',
                description: 'Developing and reviewing national health policies.',
                functions: [
                    'Policy formulation',
                    'Policy review',
                    'Legislative support',
                    'Policy implementation guidance'
                ]
            }
        ],
        documents: [
            {
                title: 'National Health Sector Strategic Plan',
                type: 'PDF',
                size: '4.2 MB',
                link: '#'
            },
            {
                title: 'Health Information Systems Strategy',
                type: 'PDF',
                size: '2.8 MB',
                link: '#'
            },
            {
                title: 'M&E Framework 2022-2027',
                type: 'PDF',
                size: '3.1 MB',
                link: '#'
            }
        ],
        contact: {
            email: 'dppi@mohs.gov.sl',
            phone: '+232 76 460 440',
            location: '5th Floor, Youyi Building'
        }
    },

    rch: {
        acronym: 'RCH',
        fullName: 'Reproductive & Child Health',
        icon: 'baby',
        about: 'The RCH Directorate coordinates maternal, newborn, and child health services to reduce maternal and child mortality across Sierra Leone.',
        aboutExtra: 'We implement life-saving interventions including antenatal care, safe delivery, immunization, and nutrition programs.',
        stats: {
            units: 5,
            districts: 16,
            staff: '1,200+',
            partners: '40+'
        },
        director: {
            name: 'Desmond Maada Kangbai',
            credentials: 'MPH, BSc Nursing',
            image: '/images/directorates/dir_rch.png',
            bio: [
                'Mr. Kangbai has over 15 years of experience in public health, specializing in maternal and child health programs. He leads the directorate\'s efforts to improve health outcomes for mothers and children through evidence-based interventions and partnerships.'
            ]
        },
        units: [
            {
                id: 'epi',
                name: 'Expanded Program on Immunization',
                icon: 'syringe',
                description: 'Providing life-saving vaccines to all children across Sierra Leone.',
                functions: [
                    'Routine immunization',
                    'Supplementary campaigns',
                    'Cold chain management',
                    'New vaccine introduction'
                ]
            },
            {
                id: 'rh',
                name: 'Reproductive Health Program',
                icon: 'heart',
                description: 'Supporting women\'s health through family planning and maternal care services.',
                functions: [
                    'Family planning services',
                    'Antenatal care',
                    'Safe delivery services',
                    'Postnatal care'
                ]
            },
            {
                id: 'school',
                name: 'School Health Program',
                icon: 'school',
                description: 'Promoting health and wellness among school-aged children.',
                functions: [
                    'Health screening',
                    'Health education',
                    'Deworming programs',
                    'Vision/hearing tests'
                ]
            },
            {
                id: 'quality',
                name: 'Quality Management',
                icon: 'check-circle',
                description: 'Ensuring high-quality maternal and child health services.',
                functions: [
                    'Quality standards',
                    'Service audits',
                    'Staff training',
                    'Performance monitoring'
                ]
            },
            {
                id: 'child',
                name: 'Child Health Program',
                icon: 'baby',
                description: 'Reducing child morbidity and mortality through integrated interventions.',
                functions: [
                    'IMCI implementation',
                    'Newborn care',
                    'Nutrition support',
                    'Growth monitoring'
                ]
            }
        ],
        documents: [
            {
                title: 'RMNCAH Strategy 2021-2025',
                type: 'PDF',
                size: '5.1 MB',
                link: '#'
            },
            {
                title: 'EPI Multi-Year Plan 2022-2026',
                type: 'PDF',
                size: '3.8 MB',
                link: '#'
            },
            {
                title: 'Family Planning Guidelines',
                type: 'PDF',
                size: '2.2 MB',
                link: '#'
            }
        ],
        contact: {
            email: 'rch@mohs.gov.sl',
            phone: '+232 76 460 440',
            location: '5th Floor, Youyi Building'
        }
    },

    phc: {
        acronym: 'PHC',
        fullName: 'Primary Health Care',
        icon: 'hospital',
        about: 'The Primary Health Care (PHC) Directorate is responsible for strengthening community-level health services and ensuring equitable access to essential health care across all districts in Sierra Leone.',
        aboutExtra: 'PHC leads the implementation of the Basic Package of Essential Health Services (BPEHS), coordinates community health worker programs, and supports district health management teams to deliver quality primary care services at the grassroots level.',
        stats: {
            units: 5,
            districts: 16,
            staff: '800+',
            partners: '35+'
        },
        director: {
            name: 'TBD',
            image: '/images/directorates/dir_phc.png',
            bio: [
                'Director information to be updated.'
            ]
        },
        units: [
            {
                id: 'community-health',
                name: 'Community Health Workers Program',
                icon: 'users',
                description: 'Managing and supporting community health workers delivering primary care at the grassroots level.',
                functions: [
                    'CHW recruitment and training',
                    'Community case management',
                    'Health promotion activities',
                    'CHW supervision and mentoring'
                ]
            },
            {
                id: 'district-health',
                name: 'District Health Services',
                icon: 'hospital',
                description: 'Coordinating health service delivery across all district health management teams.',
                functions: [
                    'District health planning',
                    'Facility supervision',
                    'Service delivery standards',
                    'District performance reviews'
                ]
            },
            {
                id: 'bpehs',
                name: 'Basic Package of Essential Health Services',
                icon: 'medkit',
                description: 'Ensuring delivery of the minimum set of essential health services at all primary care facilities.',
                functions: [
                    'BPEHS implementation',
                    'Service package updates',
                    'Quality of care monitoring',
                    'Essential medicines coordination'
                ]
            },
            {
                id: 'nutrition',
                name: 'Nutrition Program',
                icon: 'apple-alt',
                description: 'Addressing malnutrition through community and facility-based interventions.',
                functions: [
                    'Nutrition surveillance',
                    'Therapeutic feeding programs',
                    'Micronutrient supplementation',
                    'Infant and young child feeding'
                ]
            },
            {
                id: 'health-education',
                name: 'Health Education & Promotion',
                icon: 'chalkboard-teacher',
                description: 'Promoting health literacy and preventive health behaviors across communities.',
                functions: [
                    'Health awareness campaigns',
                    'Behavior change communication',
                    'IEC material development',
                    'Community engagement'
                ]
            }
        ],
        documents: [
            {
                title: 'BPEHS Implementation Guide',
                type: 'PDF',
                size: '3.5 MB',
                link: '#'
            },
            {
                title: 'Community Health Worker Policy',
                type: 'PDF',
                size: '2.4 MB',
                link: '#'
            },
            {
                title: 'PHC Strengthening Strategy 2022-2027',
                type: 'PDF',
                size: '4.0 MB',
                link: '#'
            }
        ],
        contact: {
            email: 'phc@mohs.gov.sl',
            phone: '+232 76 460 440',
            location: '4th Floor, Youyi Building'
        }
    },

    dpc: {
        acronym: 'DPC',
        fullName: 'Disease Prevention and Control',
        icon: 'virus',
        about: 'The Directorate of Disease Prevention and Control (DPC) leads Sierra Leone\'s efforts in preventing, detecting, and controlling communicable and non-communicable diseases through surveillance, response, and targeted disease control programs.',
        aboutExtra: 'DPC coordinates national disease surveillance systems, manages outbreak responses, and implements control programs for malaria, tuberculosis, HIV/AIDS, neglected tropical diseases, and emerging infectious threats.',
        stats: {
            units: 6,
            districts: 16,
            staff: '500+',
            partners: '45+'
        },
        director: {
            name: 'Dr. Sulaiman Lakoh',
            credentials: 'MB, ChB, MSc, MPH, FCPS-SL, FWACP',
            image: '/images/directorates/dir_dpc.png',
            bio: [
                'Dr. Sulaiman Lakoh is a Consultant Physician and Infectious Disease Specialist with 15+ years of experience in clinical care, research, and public health across sub-Saharan Africa. His expertise includes HIV, tuberculosis, viral hepatitis, antimicrobial resistance, infection prevention, and emerging infectious diseases.',
                'He holds an MBBS from the University of Sierra Leone, an MSc in Infection Prevention and Control (UK), and an MPH (Nicaragua), and is a Fellow of the West African College of Physicians.',
                'Dr. Lakoh serves on WHO guideline groups, is an ambassador for the Global Action Fund for Fungal Infections in Sierra Leone, and is a lecturer and researcher at the University of Sierra Leone. He has published 102+ articles and ranks among the country\'s top infectious disease researchers.'
            ]
        },
        units: [
            {
                id: 'surveillance',
                name: 'Disease Surveillance & Response',
                icon: 'search',
                description: 'Monitoring and responding to disease outbreaks across Sierra Leone.',
                functions: [
                    'Integrated Disease Surveillance and Response (IDSR)',
                    'Outbreak investigation and response',
                    'Event-based surveillance',
                    'Weekly epidemiological reporting'
                ]
            },
            {
                id: 'malaria',
                name: 'National Malaria Control Program',
                icon: 'bug',
                description: 'Leading the national effort to reduce malaria morbidity and mortality.',
                functions: [
                    'Insecticide-treated net distribution',
                    'Indoor residual spraying',
                    'Malaria case management',
                    'Seasonal malaria chemoprevention'
                ]
            },
            {
                id: 'tb',
                name: 'National TB & Leprosy Program',
                icon: 'lungs',
                description: 'Controlling tuberculosis and leprosy through detection, treatment, and prevention.',
                functions: [
                    'TB case finding and diagnosis',
                    'DOTS treatment supervision',
                    'Drug-resistant TB management',
                    'Leprosy control and rehabilitation'
                ]
            },
            {
                id: 'hiv',
                name: 'National HIV/AIDS Program',
                icon: 'ribbon',
                description: 'Managing the national response to HIV/AIDS through prevention, treatment, and care.',
                functions: [
                    'HIV testing and counseling',
                    'Antiretroviral therapy (ART)',
                    'Prevention of mother-to-child transmission',
                    'Key population interventions'
                ]
            },
            {
                id: 'ntd',
                name: 'Neglected Tropical Diseases Program',
                icon: 'microscope',
                description: 'Controlling and eliminating neglected tropical diseases in Sierra Leone.',
                functions: [
                    'Mass drug administration',
                    'Morbidity management',
                    'NTD surveillance and mapping',
                    'Vector control interventions'
                ]
            },
            {
                id: 'ncd',
                name: 'Non-Communicable Diseases Program',
                icon: 'heartbeat',
                description: 'Addressing the growing burden of non-communicable diseases.',
                functions: [
                    'NCD screening and management',
                    'Mental health services',
                    'Diabetes and hypertension control',
                    'Cancer prevention and early detection'
                ]
            }
        ],
        documents: [
            {
                title: 'National Malaria Strategic Plan 2021-2025',
                type: 'PDF',
                size: '4.3 MB',
                link: '#'
            },
            {
                title: 'TB & Leprosy National Strategic Plan',
                type: 'PDF',
                size: '3.6 MB',
                link: '#'
            },
            {
                title: 'HIV/AIDS National Strategic Plan',
                type: 'PDF',
                size: '5.0 MB',
                link: '#'
            }
        ],
        contact: {
            email: 'dpc@mohs.gov.sl',
            phone: '+232 76 460 440',
            location: '5th Floor, Youyi Building'
        }
    },

    nems: {
        acronym: 'NEMS',
        fullName: 'National Emergency Medical Services',
        icon: 'ambulance',
        about: 'The National Emergency Medical Services (NEMS) Directorate is responsible for coordinating emergency medical response, ambulance services, and disaster health management across Sierra Leone.',
        aboutExtra: 'NEMS ensures rapid pre-hospital care, manages the national ambulance fleet, operates the emergency call center, and coordinates health sector disaster preparedness and response activities.',
        stats: {
            units: 4,
            districts: 16,
            staff: '300+',
            partners: '20+'
        },
        director: {
            name: 'TBD',
            image: '/images/directorates/dir_nems.png',
            bio: [
                'Director information to be updated.'
            ]
        },
        units: [
            {
                id: 'ambulance',
                name: 'National Ambulance Service',
                icon: 'ambulance',
                description: 'Operating and maintaining the national fleet of ambulances for emergency patient transport.',
                functions: [
                    'Emergency patient transport',
                    'Ambulance fleet management',
                    'Paramedic deployment',
                    'Inter-facility transfers'
                ]
            },
            {
                id: 'call-center',
                name: 'Emergency Call Center (117)',
                icon: 'phone-alt',
                description: 'Managing the national emergency toll-free hotline for medical emergencies.',
                functions: [
                    'Emergency call dispatch',
                    'Triage and prioritization',
                    'Ambulance tracking and coordination',
                    'Public emergency communication'
                ]
            },
            {
                id: 'disaster',
                name: 'Disaster Health Management',
                icon: 'shield-alt',
                description: 'Coordinating health sector preparedness and response to disasters and mass casualty events.',
                functions: [
                    'Disaster preparedness planning',
                    'Mass casualty incident response',
                    'Health sector emergency coordination',
                    'Post-disaster health assessment'
                ]
            },
            {
                id: 'training',
                name: 'Emergency Medical Training',
                icon: 'graduation-cap',
                description: 'Building capacity in emergency medical care through training programs.',
                functions: [
                    'Paramedic training programs',
                    'First responder certification',
                    'Emergency care protocols',
                    'Simulation exercises and drills'
                ]
            }
        ],
        documents: [
            {
                title: 'National Emergency Medical Services Policy',
                type: 'PDF',
                size: '2.9 MB',
                link: '#'
            },
            {
                title: 'Disaster Health Management Plan',
                type: 'PDF',
                size: '3.2 MB',
                link: '#'
            },
            {
                title: 'Emergency Response Protocols',
                type: 'PDF',
                size: '1.8 MB',
                link: '#'
            }
        ],
        contact: {
            email: 'nems@mohs.gov.sl',
            phone: '117',
            location: '4th Floor, Youyi Building'
        }
    },

    ss: {
        acronym: 'SS',
        fullName: 'Support Services',
        icon: 'cogs',
        about: 'The Support Services Directorate provides essential administrative, logistical, and operational support to ensure the effective functioning of the Ministry of Health and its programs across Sierra Leone.',
        aboutExtra: 'Support Services manages human resources, financial operations, procurement, logistics and supply chain, infrastructure maintenance, and general administration for the Ministry.',
        stats: {
            units: 5,
            districts: 16,
            staff: '200+',
            partners: '15+'
        },
        director: {
            name: 'TBD',
            image: '/images/directorates/dir_ss.png',
            bio: [
                'Director information to be updated.'
            ]
        },
        units: [
            {
                id: 'hr',
                name: 'Human Resources Management',
                icon: 'user-friends',
                description: 'Managing recruitment, deployment, and development of the health workforce.',
                functions: [
                    'Staff recruitment and deployment',
                    'Payroll management',
                    'Performance appraisals',
                    'Staff welfare and development'
                ]
            },
            {
                id: 'finance',
                name: 'Financial Management',
                icon: 'money-bill-wave',
                description: 'Overseeing budgeting, accounting, and financial reporting for the Ministry.',
                functions: [
                    'Budget preparation and execution',
                    'Financial reporting and audits',
                    'Revenue management',
                    'Grant and donor fund management'
                ]
            },
            {
                id: 'procurement',
                name: 'Procurement & Supply Chain',
                icon: 'boxes',
                description: 'Managing procurement of medical supplies, equipment, and pharmaceuticals.',
                functions: [
                    'Medical supplies procurement',
                    'Equipment acquisition',
                    'Contract management',
                    'Supply chain coordination'
                ]
            },
            {
                id: 'logistics',
                name: 'Logistics & Transport',
                icon: 'truck',
                description: 'Coordinating transportation and distribution of health commodities.',
                functions: [
                    'Fleet management',
                    'Commodity distribution',
                    'Warehouse management',
                    'Last-mile delivery'
                ]
            },
            {
                id: 'admin',
                name: 'General Administration',
                icon: 'building',
                description: 'Providing administrative support and facility management for the Ministry.',
                functions: [
                    'Office management',
                    'Infrastructure maintenance',
                    'Records and archives management',
                    'Security and cleaning services'
                ]
            }
        ],
        documents: [
            {
                title: 'HR Policy and Procedures Manual',
                type: 'PDF',
                size: '3.0 MB',
                link: '#'
            },
            {
                title: 'Procurement Guidelines',
                type: 'PDF',
                size: '2.1 MB',
                link: '#'
            },
            {
                title: 'Financial Management Manual',
                type: 'PDF',
                size: '2.7 MB',
                link: '#'
            }
        ],
        contact: {
            email: 'ss@mohs.gov.sl',
            phone: '+232 76 460 440',
            location: '4th Floor, Youyi Building'
        }
    },
    nm: {
        acronym: 'NM',
        fullName: 'Nursing and Midwifery',
        icon: 'nurse',
        about: 'The Directorate of Nursing and Midwifery provides leadership and strategic direction for nursing and midwifery services in Sierra Leone.',
        aboutExtra: 'We are responsible for nursing workforce development, professional standards, and ensuring quality nursing care across all health facilities',
        stats: {
            units: 4,
            districts: 16,
            staff: '8,000+',
            partners: '15+'
        },
        director: {
            name: 'Chief Nursing Officer',
            image: '/images/directorates/dir_nm.png',
            bio: [
                'The Chief Nursing Officer provides strategic leadership for nursing and midwifery services, ensuring high professional standards and quality patient care nationwide'
            ]
        },
        units: [
            {
                id: 'nursing',
                name: 'Nursing Services',
                icon: 'user-nurse',
                description: 'Providing quality nursing care across all health facilities.',
                functions: [
                    'Nursing care delivery',
                    'Patient assessment and monitoring',
                    'Wound care and infection control',
                    'Medication administration'
                ]
            },
            {
                id: 'midwifery',
                name: 'Midwifery Services',
                icon: 'baby',
                description: 'Ensuring safe and quality midwifery care for mothers and newborns.',
                functions: [
                    'Antenatal care',
                    'Skilled birth attendance',
                    'Postnatal care',
                    'Newborn care'
                ]
            },
            {
                id: 'education',
                name: 'Nursing Education',
                icon: 'graduation-cap',
                description: 'Training and development of nursing and midwifery professionals.',
                functions: [
                    'Curriculum development',
                    'Student training and supervision',
                    'Continuing professional development',
                    'Quality assurance in education'
                ]
            },
            {
                id: 'standards',
                name: 'Professional Standards',
                icon: 'certificate',
                description: 'Setting and enforcing professional standards for nursing and midwifery practice.',
                functions: [
                    'Developing practice standards',
                    'Licensing and registration',
                    'Quality assurance',
                    'Professional conduct oversight'
                ]
            }
        ],
        documents: [
            {
                title: 'Nursing and Midwifery Policy',
                type: 'PDF',
                size: '2.5 MB',
                link: '#'
            },
            {
                title: 'Continuing Professional Development Guidelines',
                type: 'PDF',
                size: '1.8 MB',
                link: '#'
            },
            {
                title: 'Nursing and Midwifery Standards of Practice',
                type: 'PDF',
                size: '2.2 MB',
                link: '#'
            }
        ],
        contact: {
            email: 'nm@mohs.gov.sl',
            phone: '+232 76 460 440',
            location: '4th Floor, Youyi Building'
        }
    },

    ncdandmh: {
        acronym: 'NCD & MH',
        fullName: 'NCD & Mental Health',
        icon: 'brain',
        about: 'The Directorate of Non-Communicable Diseases and Mental Health addresses the growing burden of NCDs and mental health conditions in Sierra Leone. ',
        aboutExtra: 'We develop policies and programs for prevention, treatment, and management of diabetes,hypertension, cancer, mental health disorders, and other NCDs.',
        stats: {
            units: 4,
            districts: 16,
            staff: '8,000+',
            partners: '15+'
        },
        director: {
            name: 'Director of NCD & Mental Health',
            image: '/images/directorates/dir_nm.png',
            bio: [
                ' The Director leads national efforts to prevent and control NCDs and improve mental health services across Sierra Leone.'
            ]
        },
        units: [
            {
                id: 'diabetes',
                name: 'Diabetes Program',
                icon: 'user-nurse',
                description: 'Screening, treatment, and management of diabetes through facility-based services and community awareness programs.',
                functions: [
                    'Nursing care delivery',
                    'Patient assessment and monitoring',
                    'Wound care and infection control',
                    'Medication administration'
                ]
            },
            {
                id: 'cardiovascular',
                name: 'Cardiovascular Health',
                icon: 'baby',
                description: 'Prevention and management of hypertension, stroke, and other cardiovascular conditions throughintegrated care.',
                functions: [
                    'Antenatal care',
                    'Skilled birth attendance',
                    'Postnatal care',
                    'Newborn care'
                ]
            },
            {
                id: 'cancer',
                name: 'Cancer Prevention',
                icon: 'prevention',
                description: 'Early detection, screening, and treatment of common cancers including cervical and breast cancer.',
                functions: [
                    'Curriculum development',
                    'Student training and supervision',
                    'Continuing professional development',
                    'Quality assurance in education'
                ]
            },
            {
                id: 'mental-health',
                name: 'Mental Health Services',
                icon: 'services',
                description: 'Community-based mental health care, treatment of mental disorders, and reduction of stigma through awareness',
                functions: [
                    'Developing practice standards',
                    'Licensing and registration',
                    'Quality assurance',
                    'Professional conduct oversight'
                ]
            }
        ],
        documents: [
            {
                title: 'Cancer diagnoses Policy',
                type: 'PDF',
                size: '2.5 MB',
                link: '#'
            },
            {
                title: 'Mental Health Prevention Policy',
                type: 'PDF',
                size: '1.8 MB',
                link: '#'
            },
            {
                title: 'Non-communicable disease prevention Standards of Practice',
                type: 'PDF',
                size: '2.2 MB',
                link: '#'
            }
        ],
        contact: {
            email: 'ncd@mohs.gov.sl',
            phone: '+232 76 460 440',
            location: '4th Floor, Youyi Building'
        }
    },

    ps: {
        acronym: 'PS',
        fullName: 'Pharmaceutical Services',
        icon: 'pharmacy',
        about: 'The Directorate of Pharmaceutical Services ensures access to safe, effective, and quality medicines and pharmaceutical products for all Sierra Leoneans.',
        aboutExtra: 'We are responsible for drug regulation, supply chain management, and rational use of medicines across the health system. ',
        stats: {
            units: 4,
            districts: 16,
            staff: '8,000+',
            partners: '15+'
        },
        director: {
            name: 'Director of Pharmaceutical Services',
            image: '/images/directorates/dir_ps.png',
            bio: [
                'The Director leads national efforts to ensure access to safe, effective, and quality medicines and pharmaceutical products for all Sierra Leoneans.'
            ]
        },
        units: [
            {
                id: 'medicines',
                name: 'Medicines',
                icon: 'medicines',
                description: 'Distribution and management of medicines and pharmaceutical products.',
                functions: [
                    'Medicine distribution',
                    'Pharmaceutical product management',
                    'Quality assurance',
                    'Inventory management'
                ]
            },
            {
                id: 'pharmaceuticals',
                name: 'Pharmaceuticals',
                icon: 'pharmaceuticals',
                description: 'Distribution and management of pharmaceutical products.',
                functions: [
                    'Pharmaceutical product distribution',
                    'Quality assurance',
                    'Inventory management',
                    'Pharmaceutical product management'
                ]
            }
        ],
        documents: [
            {
                title: 'Medicines Policy',
                type: 'PDF',
                size: '2.5 MB',
                link: '#'
            },
            {
                title: 'Pharmaceuticals Policy',
                type: 'PDF',
                size: '1.8 MB',
                link: '#'
            },
            {
                title: 'Pharmaceuticals Standards of Practice',
                type: 'PDF',
                size: '2.2 MB',
                link: '#'
            }
        ],
        contact: {
            email: 'ps@mohs.gov.sl',
            phone: '+232 76 460 440',
            location: '4th Floor, Youyi Building'
        }
    },

    hrm: {
        acronym: 'HRM',
        fullName: 'Human Resource Management',
        icon: 'users',
        about: 'The Directorate of Human Resource Management leads the strategic planning, development, and management of the health workforce in Sierra Leone.',
        aboutExtra: 'We oversee recruitment, training, deployment, and performance management to ensure a skilled and motivated health workforce across the country.',
        stats: {
            units: 5,
            districts: 16,
            staff: '10,000+',
            partners: '20+'
        },
        director: {
            name: 'Director of Human Resources',
            image: '/images/directorates/dir_hrm.png',
            bio: [
                'Leading the transformation of the health workforce to meet the healthcare needs of the population.'
            ]
        },
        units: [
            {
                id: 'recruitment',
                name: 'Recruitment & Deployment',
                icon: 'user-plus',
                description: 'Managing the hiring and equitable distribution of health workers.',
                functions: [
                    'Staff recruitment',
                    'Deployment planning',
                    'Transfer management',
                    'Staff records'
                ]
            },
            {
                id: 'training',
                name: 'Training & Development',
                icon: 'graduation-cap',
                description: 'Coordinating pre-service and in-service training programs.',
                functions: [
                    'Training needs assessment',
                    'Scholarship management',
                    'CPD coordination',
                    'Training institutions liaison'
                ]
            },
            {
                id: 'performance',
                name: 'Performance Management',
                icon: 'chart-line',
                description: 'Monitoring and evaluating staff performance.',
                functions: [
                    'Performance appraisal',
                    'Staff supervision',
                    'Career progression',
                    'Disciplinary matters'
                ]
            }
        ],
        documents: [
            {
                title: 'HRH Strategic Plan',
                type: 'PDF',
                size: '3.5 MB',
                link: '#'
            },
            {
                title: 'Scheme of Service',
                type: 'PDF',
                size: '2.8 MB',
                link: '#'
            }
        ],
        contact: {
            email: 'hr@mohs.gov.sl',
            phone: '+232 76 460 440',
            location: '4th Floor, Youyi Building'
        }
    },

    hrm: {
        acronym: 'hrm',
        fullName: 'Human Resource Management',
        icon: '',
        about: 'The Directorate of Human Resource Management is responsible for the strategic management of human resources within the Ministry of Health.',
        aboutExtra: 'We oversee recruitment, deployment, training, and retention of health workers to ensure adequate staffing across all health facilities in Sierra Leone.',
        stats: {
            units: 4,
            districts: 16,
            staff: '8,000+',
            partners: '15+'
        },
        director: {
            name: 'Director of Human Resource Management',
            image: '/images/directorates/dir_hrm.png',
            bio: [
                'The Director leads all HR functions including workforce planning, recruitment, staff development, and employee relations across the health sector'
            ]
        },
        units: [
            {
                id: 'recruitment',
                name: 'Recruitment',
                icon: 'recruitment',
                description: 'Recruitment and deployment of health workers.',
                functions: [
                    'Recruitment',
                    'Deployment',
                    'Training',
                    'Retention'
                ]
            },
            {
                id: 'training',
                name: 'Training',
                icon: 'training',
                description: 'Training of health workers.',
                functions: [
                    'Training',
                    'Deployment',
                    'Training',
                    'Training'
                ]
            }
        ],
        documents: [
            {
                title: 'Recruitment Policy',
                type: 'PDF',
                size: '2.5 MB',
                link: '#'
            },
            {
                title: 'Training Policy',
                type: 'PDF',
                size: '1.8 MB',
                link: '#'
            },
            {
                title: 'Staff Development Policy',
                type: 'PDF',
                size: '2.2 MB',
                link: '#'
            }
        ],
        contact: {
            email: 'hrm@mohs.gov.sl',
            phone: '+232 76 460 440',
            location: '4th Floor, Youyi Building'
        }
    },
    tr: {
        acronym: 'tr',
        fullName: 'Training and Research',
        icon: 'training',
        about: 'The Directorate of Training and Research is responsible for the strategic management of human resources within the Ministry of Health.',
        aboutExtra: 'We oversee recruitment, deployment, training, and retention of health workers to ensure adequate staffing across all health facilities in Sierra Leone.',
        stats: {
            units: 4,
            districts: 16,
            staff: '8,000+',
            partners: '15+'
        },
        director: {
            name: 'Director of Training and Research',
            image: '/images/directorates/dir_tr.png',
            bio: [
                'The Director leads all TR functions including workforce planning, recruitment, staff development, and employee relations across the health sector'
            ]
        },
        units: [
            {
                id: 'recruitment',
                name: 'Recruitment',
                icon: 'recruitment',
                description: 'Recruitment and deployment of health workers.',
                functions: [
                    'Recruitment',
                    'Deployment',
                    'Training',
                    'Retention'
                ]
            },
            {
                id: 'training',
                name: 'Training',
                icon: 'training',
                description: 'Training of health workers.',
                functions: [
                    'Training',
                    'Deployment',
                    'Training',
                    'Training'
                ]
            }
        ],
        documents: [
            {
                title: 'Recruitment Policy',
                type: 'PDF',
                size: '2.5 MB',
                link: '#'
            },
            {
                title: 'Training Policy',
                type: 'PDF',
                size: '1.8 MB',
                link: '#'
            },
            {
                title: 'Staff Development Policy',
                type: 'PDF',
                size: '2.2 MB',
                link: '#'
            }
        ],
        contact: {
            email: 'tr@mohs.gov.sl',
            phone: '+232 76 460 440',
            location: '4th Floor, Youyi Building'
        }
    },
    ehc: {
        acronym: 'ehc',
        fullName: 'Environmental Health and Sanitation',
        icon: 'ehc',
        about: 'The Directorate of Environmental Health and Sanitation works to protect public health through environmental interventions, sanitation improvement, and hygiene promotion.',
        aboutExtra: 'We coordinate WASH (Water, Sanitation, and Hygiene) activities and ensure healthy environmental conditions across communities.',
        stats: {
            units: 4,
            districts: 16,
            staff: '8,000+',
            partners: '15+'
        },
        director: {
            name: 'Director of Environmental Health and Sanitation',
            image: '/images/directorates/dir_ehc.png',
            bio: [
                'The Director leads all EHC functions including workforce planning, recruitment, staff development, and employee relations across the health sector. The Director leads environmental health programs, WASH interventions, and sanitation improvement initiatives across Sierra Leone.'
            ]
        },
        units: [
            {
                id: 'WASH',
                name: 'wash',
                icon: 'water',
                description: 'Improving access to safe drinking water, adequate sanitation, and hygiene practices in communities, schools, and health facilities.',
                functions: [
                    'Water',
                    'Sanitation',
                    'Hygiene',
                    'Training'
                ]
            },
            {
                id: 'sanitation',
                name: 'Sanitation Improvement ',
                icon: 'sanitation',
                description: 'Promoting safe sanitation practices and improving access to sanitation facilities in communities, schools, and health facilities.',
                functions: [
                    'Sanitation',
                    'Hygiene',
                ]
            },
            {
                id: 'hygiene',
                name: 'Hygiene',
                icon: 'hygiene',
                description: 'Promoting safe hygiene practices and improving access to hygiene facilities in communities, schools, and health facilities.',
                functions: [
                    'Hygiene',
                    'Sanitation',
                ]
            },
            {
                id: 'inspection',
                name: 'Inspection',
                icon: 'search',
                description: 'Promoting open defecation free communities, constructing improved latrines, and managing solid waste disposal systems.',
                functions: [
                    'Food Safety',
                    'Food Quality',
                ]
            }
        ],
        documents: [
            {
                title: 'Recruitment Policy',
                type: 'PDF',
                size: '2.5 MB',
                link: '#'
            },
            {
                title: 'Training Policy',
                type: 'PDF',
                size: '1.8 MB',
                link: '#'
            },
            {
                title: 'Staff Development Policy',
                type: 'PDF',
                size: '2.2 MB',
                link: '#'
            }
        ],
        contact: {
            email: 'ehc@mohs.gov.sl',
            phone: '+232 76 460 440',
            location: '4th Floor, Youyi Building'
        }
    },

    fn: {
        acronym: 'fn',
        fullName: 'Food and Nutrition',
        icon: 'food',
        about: 'The Directorate of Food and Nutrition works to prevent and address malnutrition across Sierra Leone through evidence-based nutrition interventions.',
        aboutExtra: 'We focus on maternal and child nutrition, micronutrient supplementation, and promoting healthy dietary practices for all citizens.',
        stats: {
            units: 4,
            districts: 16,
            staff: '8,000+',
            partners: '15+'
        },
        director: {
            name: 'Director of Food and Health',
            image: '/images/directorates/dir_fh.png',
            bio: [
                'The Director leads national nutrition programs to reduce malnutrition and improve dietary practices across Sierra Leone.'
            ]
        },
        units: [
            {
                id: 'CMAM',
                name: 'Community Management of Acute Malnutrition',
                icon: 'community',
                description: 'Treatment of severe and moderate acute malnutrition in children under 5 through outpatient and inpatient therapeutic care.',
                functions: [
                    'Community Management of Acute Malnutrition',
                    'Infant and Young Child Feeding',
                    'Micronutrient Supplementation',
                    'Nutrition Education and Counseling'
                ]
            },
            {
                id: 'IYCF',
                name: 'Infant and Young Child Feeding',
                icon: 'feeding',
                description: 'Promoting optimal infant and young child feeding practices to improve child health and nutrition outcomes.',
                functions: [
                    'Infant and Young Child Feeding',
                    'Micronutrient Supplementation',
                    'Nutrition Education and Counseling'
                ]
            },
            {
                id: 'Micronutrient_Supplementation',
                name: 'Micronutrient Supplementation',
                icon: 'supplementation',
                description: 'Promoting optimal infant and young child feeding practices to improve child health and nutrition outcomes.',
                functions: [
                    'Infant and Young Child Feeding',
                    'Micronutrient Supplementation',
                    'Nutrition Education and Counseling'
                ]
            },
            {
                id: 'Nutrition_Education_and_Counseling',
                name: 'Nutrition Education and Counseling',
                icon: 'education',
                description: 'Promoting optimal infant and young child feeding practices to improve child health and nutrition outcomes.',
                functions: [
                    'Infant and Young Child Feeding',
                    'Micronutrient Supplementation',
                    'Nutrition Education and Counseling'
                ]
            }
        ],
        documents: [
            {
                title: 'Recruitment Policy',
                type: 'PDF',
                size: '2.5 MB',
                link: '#'
            },
            {
                title: 'Training Policy',
                type: 'PDF',
                size: '1.8 MB',
                link: '#'
            },
            {
                title: 'Staff Development Policy',
                type: 'PDF',
                size: '2.2 MB',
                link: '#'
            }
        ],
        contact: {
            email: 'fh@mohs.gov.sl',
            phone: '+232 76 460 440',
            location: '4th Floor, Youyi Building'
        }
    }
}

