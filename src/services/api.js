// Mock data - December 2025
let timesheets = [
    {
        id: '1',
        weekNumber: 48,
        startDate: '2025-11-25',
        endDate: '2025-11-29',
        status: 'COMPLETED',
        projectName: 'Homepage Development',
        hours: 40,
    },
    {
        id: '2',
        weekNumber: 49,
        startDate: '2025-12-02',
        endDate: '2025-12-06',
        status: 'COMPLETED',
        projectName: 'Homepage Development',
        hours: 40,
    },
    {
        id: '3',
        weekNumber: 50,
        startDate: '2025-12-09',
        endDate: '2025-12-13',
        status: 'INCOMPLETE',
        projectName: 'Homepage Development',
        hours: 20,
    },
    {
        id: '4',
        weekNumber: 51,
        startDate: '2025-12-16',
        endDate: '2025-12-20',
        status: 'COMPLETED',
        projectName: 'Homepage Development',
        hours: 40,
    },
    {
        id: '5',
        weekNumber: 52,
        startDate: '2025-12-23',
        endDate: '2025-12-27',
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
