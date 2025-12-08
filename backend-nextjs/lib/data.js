// In-memory data stores
export let users = [
    {
        id: '1',
        name: 'John Doe',
        email: 'muneebtech005@gmail.com',
        password: 'muneebtech005', // In production, this should be hashed!
    },
];

export let timesheets = [
    {
        id: '1',
        weekNumber: 48,
        startDate: '2025-11-25',
        endDate: '2025-11-29',
        status: 'COMPLETED',
        projectName: 'Homepage Development',
        typeOfWork: 'Development',
        description: 'Working on homepage redesign',
        hours: 40,
    },
    {
        id: '2',
        weekNumber: 49,
        startDate: '2025-12-02',
        endDate: '2025-12-06',
        status: 'COMPLETED',
        projectName: 'Homepage Development',
        typeOfWork: 'Development',
        description: 'Continued homepage work',
        hours: 40,
    },
    {
        id: '3',
        weekNumber: 50,
        startDate: '2025-12-09',
        endDate: '2025-12-13',
        status: 'INCOMPLETE',
        projectName: 'Homepage Development',
        typeOfWork: 'Bug fixes',
        description: 'Fixed critical bugs',
        hours: 20,
    },
];
