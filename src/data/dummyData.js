/**
 * Dummy data for initial seeding of the JOBY marketplace.
 * Covers multiple industries, both employer and seeker profiles.
 */

export const PINTEREST_IMAGES = [
    'https://i.pinimg.com/736x/f4/c0/27/f4c0271289275fe3cfdef89eb16d9f5e.jpg',
    'https://i.pinimg.com/736x/7f/e0/33/7fe0334627135176b819b02a397bda27.jpg',
    'https://i.pinimg.com/1200x/0f/8c/87/0f8c8796df20ab23108a842ee1d01439.jpg',
    'https://i.pinimg.com/1200x/9b/49/7d/9b497df3cd94d7872eb05882b52dc4d1.jpg',
    'https://i.pinimg.com/736x/c2/bd/78/c2bd78ee39e885e7be5a4c1b3ff5d59f.jpg',
    'https://i.pinimg.com/1200x/a8/62/2a/a8622ae5703fb1e8181c714f00ff1347.jpg',
    'https://i.pinimg.com/1200x/87/7a/2f/877a2f42ff08e2536d7c29c71036db85.jpg',
    'https://i.pinimg.com/736x/18/64/04/186404a3f274a14c7073d4238a096c8d.jpg',
    'https://i.pinimg.com/736x/74/b5/6c/74b56c964d47c047d296b659cb9b49c2.jpg',
    'https://i.pinimg.com/736x/f8/cd/23/f8cd233dc5c449c27d0b2a415f12e08f.jpg'
];

export const JOB_CATEGORIES = [
    { id: 'tech', label: 'Technology', icon: PINTEREST_IMAGES[0], color: 'bg-blue-100 text-blue-700' },
    { id: 'healthcare', label: 'Healthcare', icon: PINTEREST_IMAGES[1], color: 'bg-red-100 text-red-700' },
    { id: 'finance', label: 'Finance', icon: PINTEREST_IMAGES[2], color: 'bg-green-100 text-green-700' },
    { id: 'education', label: 'Education', icon: PINTEREST_IMAGES[3], color: 'bg-yellow-100 text-yellow-700' },
    { id: 'engineering', label: 'Engineering', icon: PINTEREST_IMAGES[4], color: 'bg-orange-100 text-orange-700' },
    { id: 'marketing', label: 'Marketing', icon: PINTEREST_IMAGES[5], color: 'bg-pink-100 text-pink-700' },
    { id: 'design', label: 'Design', icon: PINTEREST_IMAGES[6], color: 'bg-purple-100 text-purple-700' },
    { id: 'legal', label: 'Legal', icon: PINTEREST_IMAGES[7], color: 'bg-indigo-100 text-indigo-700' },
    { id: 'hospitality', label: 'Hospitality', icon: PINTEREST_IMAGES[8], color: 'bg-teal-100 text-teal-700' },
    { id: 'construction', label: 'Construction', icon: PINTEREST_IMAGES[9], color: 'bg-amber-100 text-amber-700' },
    { id: 'sales', label: 'Sales', icon: PINTEREST_IMAGES[0], color: 'bg-cyan-100 text-cyan-700' },
    { id: 'remote', label: 'Remote-First', icon: PINTEREST_IMAGES[1], color: 'bg-violet-100 text-violet-700' },
]

export const JOB_TYPES = [
    { id: 'full-time', label: 'Full-Time' },
    { id: 'part-time', label: 'Part-Time' },
    { id: 'contract', label: 'Contract' },
    { id: 'freelance', label: 'Freelance' },
    { id: 'internship', label: 'Internship' },
]

export const DUMMY_USERS = [
    // ── Employers ──────────────────────────────────────────────────────────────
    {
        id: 'emp-001',
        email: 'hr@techcorp.io',
        password: 'password',
        role: 'employer',
        name: 'TechCorp Inc.',
        companyName: 'TechCorp Inc.',
        logo: PINTEREST_IMAGES[2],
        description: 'Leading software house building next-gen SaaS products used by millions worldwide.',
        website: 'https://techcorp.io',
        location: 'San Francisco, CA',
        verified: true,
        rating: 4.8,
        reviewCount: 124,
        createdAt: '2024-01-10T08:00:00Z',
    },
    {
        id: 'emp-002',
        email: 'careers@healthplus.com',
        password: 'password',
        role: 'employer',
        name: 'HealthPlus Hospital',
        companyName: 'HealthPlus Hospital',
        logo: PINTEREST_IMAGES[3],
        description: 'A world-class medical institution committed to compassionate patient care and research excellence.',
        website: 'https://healthplus.com',
        location: 'New York, NY',
        verified: true,
        rating: 4.6,
        reviewCount: 89,
        createdAt: '2024-01-15T08:00:00Z',
    },
    {
        id: 'emp-003',
        email: 'jobs@buildright.co',
        password: 'password',
        role: 'employer',
        name: 'BuildRight Construction',
        companyName: 'BuildRight Construction',
        logo: PINTEREST_IMAGES[4],
        description: 'Award-winning construction firm specialising in commercial and residential projects.',
        website: 'https://buildright.co',
        location: 'Austin, TX',
        verified: false,
        rating: 4.2,
        reviewCount: 41,
        createdAt: '2024-02-01T08:00:00Z',
    },
    // ── Job Seekers ────────────────────────────────────────────────────────────
    {
        id: 'seek-001',
        email: 'alice@example.com',
        password: 'password',
        role: 'seeker',
        name: 'Alice Johnson',
        title: 'Senior Full-Stack Developer',
        bio: 'Passionate engineer with 7+ years of experience building scalable web applications. Open to remote and hybrid opportunities.',
        avatar: PINTEREST_IMAGES[5],
        skills: ['React', 'Node.js', 'TypeScript', 'GraphQL', 'AWS', 'Docker'],
        experience: [
            { company: 'Google', role: 'Software Engineer', from: '2021', to: '2024' },
            { company: 'Stripe', role: 'Frontend Engineer', from: '2018', to: '2021' },
        ],
        education: [
            { institution: 'MIT', degree: 'B.Sc. Computer Science', year: '2018' },
        ],
        verified: true,
        rating: 4.9,
        reviewCount: 32,
        cvUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        category: 'tech',
        featured: true,
        portfolioImages: [
            PINTEREST_IMAGES[6],
            PINTEREST_IMAGES[7],
            PINTEREST_IMAGES[8]
        ],
        location: 'Remote',
        createdAt: '2024-01-20T08:00:00Z',
    },
    {
        id: 'seek-002',
        email: 'bob@example.com',
        password: 'password',
        role: 'seeker',
        name: 'Bob Martinez',
        title: 'Registered Nurse (RN)',
        bio: 'Experienced RN with 5 years in emergency and critical care. Looking for hospital or clinic positions.',
        avatar: PINTEREST_IMAGES[9],
        skills: ['Patient Care', 'ICU', 'Triage', 'Medication Administration', 'EMR Systems'],
        experience: [
            { company: 'City General Hospital', role: 'Emergency Nurse', from: '2019', to: '2024' },
        ],
        education: [
            { institution: 'NYU', degree: 'B.Sc. Nursing', year: '2019' },
        ],
        verified: true,
        rating: 4.7,
        reviewCount: 18,
        cvUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        category: 'healthcare',
        featured: true,
        portfolioImages: [
            PINTEREST_IMAGES[0],
            PINTEREST_IMAGES[1]
        ],
        location: 'New York, NY',
        createdAt: '2024-01-22T08:00:00Z',
    },
    {
        id: 'seek-003',
        email: 'sarah@example.com',
        password: 'password',
        role: 'seeker',
        name: 'Sarah Chen',
        title: 'Creative Art Director',
        bio: 'Award-winning designer with a focus on brand identity and digital experience.',
        avatar: PINTEREST_IMAGES[2],
        skills: ['Art Direction', 'Branding', 'Figma', 'Adobe Suite', 'Illustration'],
        experience: [
            { company: 'Pentagram', role: 'Senior Designer', from: '2020', to: '2024' },
            { company: 'Apple', role: 'Visual Designer', from: '2017', to: '2020' },
        ],
        education: [
            { institution: 'RISD', degree: 'BFA Graphic Design', year: '2017' },
        ],
        verified: true,
        rating: 4.9,
        reviewCount: 45,
        cvUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        category: 'design',
        featured: true,
        portfolioImages: [
            PINTEREST_IMAGES[3],
            PINTEREST_IMAGES[4]
        ],
        location: 'Los Angeles, CA',
        createdAt: '2024-02-05T08:00:00Z',
    },
    {
        id: 'seek-004',
        email: 'james@example.com',
        password: 'password',
        role: 'seeker',
        name: 'James Wilson',
        title: 'Financial Analyst',
        bio: 'CFA charterholder with 6 years of experience in investment banking and corporate finance.',
        avatar: PINTEREST_IMAGES[5],
        skills: ['Financial Modeling', 'Valuation', 'SQL', 'Python', 'Excel'],
        experience: [
            { company: 'Goldman Sachs', role: 'Analyst', from: '2018', to: '2024' },
        ],
        education: [
            { institution: 'Wharton', degree: 'MBA Finance', year: '2018' },
        ],
        verified: true,
        rating: 4.8,
        reviewCount: 22,
        cvUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        category: 'finance',
        featured: false,
        portfolioImages: [],
        location: 'Chicago, IL',
        createdAt: '2024-02-10T08:00:00Z',
    },
]

export const DUMMY_JOBS = [
    {
        id: 'job-001',
        employerId: 'emp-001',
        employerName: 'TechCorp Inc.',
        employerLogo: PINTEREST_IMAGES[2],
        title: 'Senior React Developer',
        category: 'tech',
        type: 'full-time',
        location: 'San Francisco, CA (Remote OK)',
        salary: { min: 120000, max: 160000, currency: 'USD' },
        description: `We are looking for an experienced React developer to join our growing engineering team.

**Responsibilities:**
- Build and maintain high-performance React applications
- Collaborate with designers and backend engineers
- Conduct code reviews and mentor junior engineers
- Champion best practices and modern tooling

**Requirements:**
- 5+ years of React experience
- Proficiency in TypeScript, REST APIs, and Git
- Experience with testing libraries (Jest, Cypress)
- Strong communication skills`,
        skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
        postedAt: '2025-04-28T08:00:00Z',
        deadline: '2025-06-01T00:00:00Z',
        status: 'open',
        featured: true,
        applicationCount: 23,
    },
    {
        id: 'job-002',
        employerId: 'emp-001',
        employerName: 'TechCorp Inc.',
        employerLogo: PINTEREST_IMAGES[2],
        title: 'DevOps Engineer',
        category: 'tech',
        type: 'full-time',
        location: 'Remote',
        salary: { min: 100000, max: 140000, currency: 'USD' },
        description: `Join our infrastructure team and help us scale our platform to support millions of users.

**Responsibilities:**
- Manage and optimise CI/CD pipelines
- Implement and maintain Kubernetes clusters
- Monitor system performance and on-call rotation

**Requirements:**
- 3+ years DevOps/SRE experience
- Strong knowledge of Kubernetes, Terraform, and AWS
- Experience with monitoring (Datadog, Prometheus)`,
        skills: ['Kubernetes', 'Terraform', 'AWS', 'Docker', 'CI/CD'],
        postedAt: '2025-04-25T08:00:00Z',
        deadline: '2025-05-30T00:00:00Z',
        status: 'open',
        featured: false,
        applicationCount: 14,
    },
    {
        id: 'job-003',
        employerId: 'emp-002',
        employerName: 'HealthPlus Hospital',
        employerLogo: PINTEREST_IMAGES[3],
        title: 'Emergency Room Registered Nurse',
        category: 'healthcare',
        type: 'full-time',
        location: 'New York, NY',
        salary: { min: 75000, max: 95000, currency: 'USD' },
        description: `HealthPlus Hospital is seeking a compassionate and skilled RN to join our busy ER team.

**Responsibilities:**
- Provide immediate care to incoming patients
- Triage patients according to urgency
- Collaborate with physicians and specialists

**Requirements:**
- Valid RN license in NY State
- 2+ years ER experience preferred
- BLS and ACLS certifications`,
        skills: ['Patient Care', 'ICU', 'Triage', 'Medication Administration'],
        postedAt: '2025-04-20T08:00:00Z',
        deadline: '2025-05-25T00:00:00Z',
        status: 'open',
        featured: true,
        applicationCount: 8,
    },
    {
        id: 'job-004',
        employerId: 'emp-002',
        employerName: 'HealthPlus Hospital',
        employerLogo: PINTEREST_IMAGES[3],
        title: 'Medical Data Analyst',
        category: 'healthcare',
        type: 'part-time',
        location: 'New York, NY (Hybrid)',
        salary: { min: 45000, max: 60000, currency: 'USD' },
        description: `Analyse clinical data to improve patient outcomes and operational efficiency.

**Requirements:**
- Experience with SQL, Python, or R
- Background in health informatics or data science
- Familiarity with EHR/EMR systems`,
        skills: ['SQL', 'Python', 'Data Analysis', 'Healthcare IT', 'Excel'],
        postedAt: '2025-04-22T08:00:00Z',
        deadline: '2025-05-28T00:00:00Z',
        status: 'open',
        featured: false,
        applicationCount: 5,
    },
    {
        id: 'job-005',
        employerId: 'emp-003',
        employerName: 'BuildRight Construction',
        employerLogo: PINTEREST_IMAGES[4],
        title: 'Site Project Manager',
        category: 'construction',
        type: 'contract',
        location: 'Austin, TX',
        salary: { min: 80000, max: 110000, currency: 'USD' },
        description: `Lead construction projects from inception to completion, ensuring quality, safety, and on-time delivery.

**Requirements:**
- 5+ years project management in construction
- PMP or equivalent certification preferred
- Strong knowledge of building codes and safety regulations`,
        skills: ['Project Management', 'AutoCAD', 'Budgeting', 'Safety Compliance', 'Team Leadership'],
        postedAt: '2025-04-18T08:00:00Z',
        deadline: '2025-05-20T00:00:00Z',
        status: 'open',
        featured: false,
        applicationCount: 3,
    },
    {
        id: 'job-006',
        employerId: 'emp-001',
        employerName: 'TechCorp Inc.',
        employerLogo: PINTEREST_IMAGES[2],
        title: 'UX/UI Designer',
        category: 'design',
        type: 'full-time',
        location: 'Remote',
        salary: { min: 85000, max: 115000, currency: 'USD' },
        description: `Shape the future of our product design and user experience across web and mobile platforms.

**Responsibilities:**
- Design wireframes, prototypes, and high-fidelity mockups
- Conduct user research and usability testing
- Collaborate with engineering on implementation

**Requirements:**
- 3+ years UX/UI design experience
- Proficiency in Figma
- Portfolio demonstrating product thinking`,
        skills: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
        postedAt: '2025-04-27T08:00:00Z',
        deadline: '2025-05-30T00:00:00Z',
        status: 'open',
        featured: true,
        applicationCount: 19,
    },
]

const firstNames = ['James', 'Emma', 'Michael', 'Olivia', 'William', 'Ava', 'Alexander', 'Sophia', 'Matthew', 'Isabella', 'Daniel', 'Mia', 'Joseph', 'Charlotte', 'David', 'Amelia', 'Henry', 'Harper', 'Jackson', 'Evelyn'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
const jobTitlesPrefix = ['Senior', 'Lead', 'Chief', 'Principal', 'Junior', 'Associate', 'Executive', 'Expert'];
const companyNames = ['Global Corp', 'TechFlow', 'InnovateX', 'Apex Solutions', 'Nexus Systems', 'Quantum Dynamics', 'Zenith Enterprises', 'Aura Consulting'];

// Auto-generate missing data to ensure each category has at least 3 jobs and 3 professionals
JOB_CATEGORIES.forEach(cat => {
    const existingSeekers = DUMMY_USERS.filter(u => u.role === 'seeker' && u.category === cat.id);
    const existingJobs = DUMMY_JOBS.filter(j => j.category === cat.id);
    
    for (let i = existingSeekers.length; i < 3; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const prefix = jobTitlesPrefix[Math.floor(Math.random() * jobTitlesPrefix.length)];
        
        DUMMY_USERS.push({
            id: `auto-seek-${cat.id}-${i}`,
            email: `auto-${cat.id}-${i}@example.com`,
            password: 'password',
            role: 'seeker',
            name: `${firstName} ${lastName}`,
            title: `${prefix} ${cat.label} Specialist`,
            bio: `Highly skilled professional in the ${cat.label} sector with a proven track record.`,
            avatar: PINTEREST_IMAGES[Math.floor(Math.random() * PINTEREST_IMAGES.length)],
            skills: [cat.label, 'Communication', 'Leadership', 'Problem Solving'],
            experience: [{ company: companyNames[Math.floor(Math.random() * companyNames.length)], role: `${cat.label} Specialist`, from: '2019', to: '2024' }],
            education: [{ institution: 'State University', degree: `B.A. ${cat.label}`, year: '2019' }],
            verified: true,
            rating: Number((4.0 + (i * 0.3)).toFixed(1)),
            reviewCount: 10 + i * 5,
            cvUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            category: cat.id,
            featured: false,
            portfolioImages: [
                PINTEREST_IMAGES[Math.floor(Math.random() * PINTEREST_IMAGES.length)]
            ],
            location: 'Remote',
            createdAt: new Date().toISOString(),
        });
    }

    for (let i = existingJobs.length; i < 3; i++) {
        const prefix = jobTitlesPrefix[Math.floor(Math.random() * jobTitlesPrefix.length)];
        const company = companyNames[Math.floor(Math.random() * companyNames.length)];
        
        DUMMY_JOBS.push({
            id: `auto-job-${cat.id}-${i}`,
            employerId: 'emp-001',
            employerName: company,
            employerLogo: PINTEREST_IMAGES[Math.floor(Math.random() * PINTEREST_IMAGES.length)],
            title: `${prefix} ${cat.label} Expert Needed`,
            category: cat.id,
            type: 'full-time',
            location: 'Remote',
            salary: { min: 60000 + i*10000, max: 90000 + i*10000, currency: 'USD' },
            description: `We are looking for a ${cat.label} specialist.\n\n**Requirements:**\n- 3+ years experience\n- Strong background in ${cat.label}`,
            skills: [cat.label, 'Teamwork', 'Innovation'],
            postedAt: new Date(Date.now() - i * 86400000).toISOString(),
            deadline: '2025-12-31T00:00:00Z',
            status: 'open',
            featured: false,
            applicationCount: 5 + i * 2,
        });
    }
});
