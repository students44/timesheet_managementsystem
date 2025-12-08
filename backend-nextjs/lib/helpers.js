// Helper function to calculate week number and end date
export function calculateWeekData(startDate) {
    const date = new Date(startDate);
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);

    // Calculate end date (4 days after start for a work week)
    const endDate = new Date(date);
    endDate.setDate(date.getDate() + 4);

    return {
        weekNumber,
        endDate: endDate.toISOString().split('T')[0],
    };
}

// Helper function to generate a simple token
export function generateToken(userId) {
    return Buffer.from(`${userId}:${Date.now()}`).toString('base64');
}
