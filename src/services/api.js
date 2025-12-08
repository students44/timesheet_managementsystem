// API Base URL - can be configured via environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'An error occurred' }));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
};

// Helper function to get auth token if needed
const getAuthHeaders = () => {
    const user = localStorage.getItem('user');
    const headers = {
        'Content-Type': 'application/json',
    };

    if (user) {
        const userData = JSON.parse(user);
        if (userData.token) {
            headers['Authorization'] = `Bearer ${userData.token}`;
        }
    }

    return headers;
};

export const api = {

    getTimesheets: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/timesheets`, {
                method: 'GET',
                headers: getAuthHeaders(),
            });
            return await handleResponse(response);
        } catch (error) {
            console.error('Error fetching timesheets:', error);
            throw error;
        }
    },

    // Create a new timesheet entry
    createTimesheet: async (data) => {
        try {
            const response = await fetch(`${API_BASE_URL}/timesheets`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(data),
            });
            return await handleResponse(response);
        } catch (error) {
            console.error('Error creating timesheet:', error);
            throw error;
        }
    },

    // Update an existing timesheet
    updateTimesheet: async (id, data) => {
        try {
            const response = await fetch(`${API_BASE_URL}/timesheets/${id}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(data),
            });
            return await handleResponse(response);
        } catch (error) {
            console.error('Error updating timesheet:', error);
            throw error;
        }
    },

    // Delete a timesheet
    deleteTimesheet: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/timesheets/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders(),
            });
            return await handleResponse(response);
        } catch (error) {
            console.error('Error deleting timesheet:', error);
            throw error;
        }
    },

    // Login endpoint (if you have authentication in your backend)
    login: async (email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            return await handleResponse(response);
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    },
};
