import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TimesheetTable } from '../components/TimesheetTable';
import { TimesheetModal } from '../components/TimesheetModal';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { api } from '../services/api';
import '../App.css';
import { ChevronDownIcon } from "@heroicons/react/24/outline";


export default function Dashboard() {
    const navigate = useNavigate();
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
        console.log('Dashboard mounted, fetching timesheets...');
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
        // For MISSING status, clear the form but keep the ID for updating
        if (entry.status === 'MISSING') {
            setEditingEntry({
                ...entry,
                projectName: '',
                typeOfWork: '',
                description: '',
                hours: 8,
            });
        } else {
            setEditingEntry(entry);
        }
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-gray-900 logo-text">ticktock</h1>
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

                    </div>
                    <div className="flex space-x-3 mb-4">
                        <Select>
                            <option>Date Range</option>
                        </Select>
                        <Select>
                            <option>Status</option>
                        </Select>
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
                            onView={(entry) => navigate(`/timesheet/${entry.weekNumber}`)}
                        />
                    )}

                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-gray-200 pt-4 gap-3">

                        {/* 5 per page box */}
                        <div className="text-sm  border text-black rounded-lg pegi-text flex w-full sm:w-auto justify-between sm:justify-start px-2 py-1">
                            5 per page
                            <ChevronDownIcon className="w-4 h-4 mt-1 ms-1" />
                        </div>

                        {/* Pagination container */}
                        <div className="inline-flex items-stretch rounded-md border border-gray-300 overflow-hidden pegi-container w-full sm:w-auto">
                            <button disabled className="px-3 py-1 text-sm font-medium text-gray-400 bg-gray-50 cursor-not-allowed flex items-center justify-center w-full sm:w-auto">
                                Previous
                            </button>
                            <button className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 border-l border-gray-300 flex items-center justify-center w-full sm:w-auto">
                                1
                            </button>
                            <button className="px-3 py-1 text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 border-l border-gray-300 flex items-center justify-center w-full sm:w-auto">
                                2
                            </button>
                            <button className="px-3 py-1 text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 border-l border-gray-300 flex items-center justify-center w-full sm:w-auto">
                                3
                            </button>
                            <span className="px-3 py-1 text-gray-500 border-l border-gray-300 flex items-center justify-center w-full sm:w-auto">
                                ...
                            </span>
                            <button className="px-3 py-1 text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 border-l border-gray-300 flex items-center justify-center w-full sm:w-auto">
                                99
                            </button>
                            <button className="px-3 py-1 text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 border-l border-gray-300 flex items-center justify-center w-full sm:w-auto">
                                Next
                            </button>
                        </div>

                    </div>

                </div>
            </main>

            <Footer />

            <TimesheetModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={editingEntry?.id ? handleUpdate : handleCreate}
                initialData={editingEntry}
            />
        </div>
    );
}
