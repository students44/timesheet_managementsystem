import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TimesheetTable } from '../components/TimesheetTable';
import { TimesheetModal } from '../components/TimesheetModal';
import { Button } from '../components/ui/Button';
import { api } from '../services/api';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const [timesheets, setTimesheets] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEntry, setEditingEntry] = useState(undefined);
    const [loading, setLoading] = useState(true);

    const fetchTimesheets = async () => {
        try {
            console.log('Fetching timesheets...');
            const data = await api.getTimesheets();
            console.log('Timesheets fetched:', data);
            setTimesheets(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch timesheets', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTimesheets();
    }, []);

    const handleCreate = async (data) => {
        try {
            await api.createTimesheet(data);
            fetchTimesheets();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Failed to create entry', error);
        }
    };

    const handleUpdate = async (data) => {
        if (!editingEntry) return;
        try {
            await api.updateTimesheet(editingEntry.id, data);
            fetchTimesheets();
            setIsModalOpen(false);
            setEditingEntry(undefined);
        } catch (error) {
            console.error('Failed to update entry', error);
        }
    };

    const openCreateModal = () => {
        setEditingEntry(undefined);
        setIsModalOpen(true);
    };

    const openEditModal = (entry) => {
        setEditingEntry(entry);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-gray-900">ticktock</h1>
                        <span className="ml-4 text-sm text-gray-500">Timesheets</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-700">
                            {user?.name || 'User'}
                        </span>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={logout}
                        >
                            Sign out
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">Your Timesheets</h2>
                        <div className="flex space-x-2">
                            <select className="rounded-md border-gray-300 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                <option>Date Range</option>
                            </select>
                            <select className="rounded-md border-gray-300 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                <option>Status</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">Loading timesheets...</p>
                        </div>
                    ) : timesheets.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No timesheets found.</p>
                        </div>
                    ) : (
                        <TimesheetTable
                            timesheets={timesheets}
                            onEdit={openEditModal}
                            onView={(entry) => console.log('View', entry)}
                        />
                    )}

                    <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                        <div className="text-sm text-gray-500">5 per page</div>
                        <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" disabled>
                                Previous
                            </Button>
                            <div className="flex items-center space-x-1">
                                <button className="rounded px-2 py-1 text-sm font-medium text-blue-600 bg-blue-50">
                                    1
                                </button>
                                <button className="rounded px-2 py-1 text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    2
                                </button>
                                <button className="rounded px-2 py-1 text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    3
                                </button>
                                <span className="px-2 text-gray-500">...</span>
                                <button className="rounded px-2 py-1 text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    99
                                </button>
                            </div>
                            <Button variant="ghost" size="sm">
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            <TimesheetModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={editingEntry ? handleUpdate : handleCreate}
                initialData={editingEntry}
            />
        </div>
    );
}
