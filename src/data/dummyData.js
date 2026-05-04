/**
 * Dummy data for initial seeding of the JOBY marketplace.
 * Covers multiple industries, both employer and seeker profiles.
 */

export const JOB_CATEGORIES = [
    { id: 'tech', label: 'Technology', icon: '💻', color: 'bg-blue-100 text-blue-700' },
    { id: 'healthcare', label: 'Healthcare', icon: '🏥', color: 'bg-red-100 text-red-700' },
    { id: 'finance', label: 'Finance', icon: '💰', color: 'bg-green-100 text-green-700' },
    { id: 'education', label: 'Education', icon: '🎓', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'engineering', label: 'Engineering', icon: '⚙️', color: 'bg-orange-100 text-orange-700' },
    { id: 'marketing', label: 'Marketing', icon: '📣', color: 'bg-pink-100 text-pink-700' },
    { id: 'design', label: 'Design', icon: '🎨', color: 'bg-purple-100 text-purple-700' },
    { id: 'legal', label: 'Legal', icon: '⚖️', color: 'bg-indigo-100 text-indigo-700' },
    { id: 'hospitality', label: 'Hospitality', icon: '🏨', color: 'bg-teal-100 text-teal-700' },
    { id: 'construction', label: 'Construction', icon: '🏗️', color: 'bg-amber-100 text-amber-700' },
    { id: 'sales', label: 'Sales', icon: '🤝', color: 'bg-cyan-100 text-cyan-700' },
    { id: 'remote', label: 'Remote-First', icon: '🌍', color: 'bg-violet-100 text-violet-700' },
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
        logo: 'https://ui-avatars.com/api/?name=TechCorp&background=6366f1&color=fff&size=128',
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
        logo: 'https://ui-avatars.com/api/?name=HealthPlus&background=ef4444&color=fff&size=128',
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
        logo: 'https://ui-avatars.com/api/?name=BuildRight&background=f59e0b&color=fff&size=128',
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
        avatar: 'https://ui-avatars.com/api/?name=Alice+Johnson&background=818cf8&color=fff&size=128',
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
        cvUrl: null,
        portfolioImages: [],
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
        avatar: 'https://ui-avatars.com/api/?name=Bob+Martinez&background=22c55e&color=fff&size=128',
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
        cvUrl: null,
        portfolioImages: [],
        location: 'New York, NY',
        createdAt: '2024-01-22T08:00:00Z',
    },
]

export const DUMMY_JOBS = [
    {
        id: 'job-001',
        employerId: 'emp-001',
        employerName: 'TechCorp Inc.',
        employerLogo: 'https://ui-avatars.com/api/?name=TechCorp&background=6366f1&color=fff&size=128',
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
        employerLogo: 'https://ui-avatars.com/api/?name=TechCorp&background=6366f1&color=fff&size=128',
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
        employerLogo: 'https://ui-avatars.com/api/?name=HealthPlus&background=ef4444&color=fff&size=128',
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
        employerLogo: 'https://ui-avatars.com/api/?name=HealthPlus&background=ef4444&color=fff&size=128',
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
        employerLogo: 'https://ui-avatars.com/api/?name=BuildRight&background=f59e0b&color=fff&size=128',
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
        employerLogo: 'https://ui-avatars.com/api/?name=TechCorp&background=6366f1&color=fff&size=128',
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
