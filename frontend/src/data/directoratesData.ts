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
            units: 8,
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
        ]
    },
    rch: {
        acronym: 'RCH',
        fullName: 'Reproductive and Child Health Care',
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
        about: 'The Primary Health Care Directorate coordinates maternal, newborn, and child health services to reduce maternal and child mortality across Sierra Leone.',
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
                id: 'phc',
                name: 'Primary Health Care',
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
            email: 'pch@mohs.gov.sl',
            phone: '+232 76 460 440',
            location: '5th Floor, Youyi Building'
        }
    },

    dpc: {
        acronym: 'DPC',
        fullName: 'Disease Prevention and Control',
        icon: 'virus',
        about: 'The Disease Prevention and Control Directorate coordinates maternal, newborn, and child health services to reduce maternal and child mortality across Sierra Leone.',
        aboutExtra: 'We implement life-saving interventions including antenatal care, safe delivery, immunization, and nutrition programs.',
        stats: {
            units: 5,
            districts: 16,
            staff: '1,200+',
            partners: '40+'
        },
        director: {
            name: 'Dr. Sulaiman Lakoh',
            credentials: 'MB, ChB, MSc, MPH, FCPS-SL, FWACP',
            image: '/images/directorates/dir_dp.png',
            bio: [
                'Dr. Sulaiman Lakoh is a Consultant Physician and Infectious Disease Specialist with 15+ years of experience in clinical care, research, and public health across sub-Saharan Africa. His expertise includes HIV, tuberculosis, viral hepatitis, antimicrobial resistance, infection prevention, and emerging infectious diseases. He holds an MBBS from the University of Sierra Leone, an MSc in Infection Prevention and Control (UK), and an MPH (Nicaragua), and is a Fellow of the West African College of Physicians.Dr. Lakoh serves on WHO guideline groups, is an ambassador for the Global Action Fund for Fungal Infections in Sierra Leone, and is a lecturer and researcher at the University of Sierra Leone. He has published 102+ articles and ranks among the country’s top infectious disease researchers.'
            ]
        },
        units: [
            {
                id: 'epi',
                name: '',
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
                id: 'dpc',
                name: 'DIsease Prevention Control',
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
            email: 'dpc@mohs.gov.sl',
            phone: '+232 76 460 440',
            location: '5th Floor, Youyi Building'
        }
    }
}