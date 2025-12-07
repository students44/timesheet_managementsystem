// Mock data
let timesheets = [
    {
        id: '1',
        weekNumber: 1,
        startDate: '2024-01-01',
        endDate: '2024-01-05',
        status: 'COMPLETED',
        projectName: 'Homepage Development',
        hours: 40,
    },
    {
        id: '2',
        weekNumber: 2,
        startDate: '2024-01-08',
        endDate: '2024-01-12',
        status: 'COMPLETED',
        projectName: 'Homepage Development',
        hours: 40,
    },
    {
        id: '3',
        weekNumber: 3,
        startDate: '2024-01-15',
        endDate: '2024-01-19',
        status: 'INCOMPLETE',
        projectName: 'Homepage Development',
        hours: 20,
    },
    {
        id: '4',
        weekNumber: 4,
        startDate: '2024-01-22',
        endDate: '2024-01-26',
        status: 'COMPLETED',
        projectName: 'Homepage Development',
        hours: 40,
    },
    {
        id: '5',
        weekNumber: 5,
        startDate: '2024-01-28',
        endDate: '2024-02-01',
        status: 'MISSING',
    },
];

export const api = {
    getTimesheets: async () => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        return [...timesheets];
    },

    createTimesheet: async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const newEntry = {
            id: Math.random().toString(36).substring(7),
            ...data,
            weekNumber: 6, // Mock logic
            startDate: '2024-02-05',
            endDate: '2024-02-09',
            status: 'COMPLETED',
        };
        timesheets.push(newEntry);
        return newEntry;
    },

    updateTimesheet: async (id, data) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const index = timesheets.findIndex((t) => t.id === id);
        if (index !== -1) {
            timesheets[index] = { ...timesheets[index], ...data };
            return timesheets[index];
        }
        throw new Error('Timesheet not found');
    },

    deleteTimesheet: async (id) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        timesheets = timesheets.filter((t) => t.id !== id);
        return { success: true };
    },
};
