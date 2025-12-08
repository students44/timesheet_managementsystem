import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { TimesheetModal } from '../components/TimesheetModal';
import { Footer } from '../components/Footer';
import { MoreVertical } from 'lucide-react';

export default function WeeklyTimesheet() {
    const { weekId } = useParams();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [openMenuId, setOpenMenuId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [editingTask, setEditingTask] = useState(null);
    const [tasks, setTasks] = useState([]);

    // Calculate current week's dates dynamically
    const getWeekDates = () => {
        const today = new Date();
        const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

        // Calculate Monday of this week
        const monday = new Date(today);
        const daysToMonday = currentDay === 0 ? -6 : 1 - currentDay;
        monday.setDate(today.getDate() + daysToMonday);

        // Generate weekdays (Mon-Fri)
        const weekdays = [];
        for (let i = 0; i < 5; i++) {
            const date = new Date(monday);
            date.setDate(monday.getDate() + i);

            const monthName = date.toLocaleDateString('en-US', { month: 'short' });
            const day = date.getDate();
            const fullDate = date.toISOString().split('T')[0];

            weekdays.push({
                date: `${monthName} ${day}`,
                fullDate: fullDate
            });
        }

        return weekdays;
    };

    const weekdays = getWeekDates();

    // Calculate week number and date range
    const getWeekNumber = (date) => {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    };

    const weekData = {
        weekNumber: getWeekNumber(new Date()),
        dateRange: `${weekdays[0].date} - ${weekdays[4].date}, ${new Date().getFullYear()}`,
        maxHours: 40,
    };

    // Calculate total hours from tasks
    const totalHours = tasks.reduce((sum, task) => sum + (parseInt(task.hours) || 0), 0);

    // Group tasks by date
    const groupedTasks = tasks.reduce((acc, task) => {
        if (!acc[task.date]) {
            acc[task.date] = [];
        }
        acc[task.date].push(task);
        return acc;
    }, {});

    const handleAddTask = (data) => {
        console.log('Modal data received:', data);

        // Parse the date from the modal's startDate field
        const date = new Date(data.startDate);
        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        }).replace(',', '');

        console.log('Formatted date:', formattedDate);

        if (editingTask) {
            // Update existing task
            const updatedTask = {
                ...editingTask,
                date: formattedDate,
                name: data.typeOfWork,
                hours: data.hours,
                project: data.projectName,
            };

            setTasks(prev => prev.map(task =>
                task.id === editingTask.id ? updatedTask : task
            ));

            setEditingTask(null);
        } else {
            // Add new task
            const newTask = {
                id: Date.now(),
                date: formattedDate,
                name: data.typeOfWork,
                hours: data.hours,
                project: data.projectName,
            };

            console.log('New task created:', newTask);

            // Append the new task so it appears at the bottom
            setTasks(prev => [...prev, newTask]);
        }

        setIsModalOpen(false);
        setSelectedDate(null);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleDeleteTask = (taskId) => {
        if (confirm('Are you sure you want to delete this task?')) {
            setTasks(prev => prev.filter(task => task.id !== taskId));
            setOpenMenuId(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-8">
                        <h1 className="text-2xl font-bold text-gray-900">ticktock</h1>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="text-sm font-medium text-gray-700 hover:text-gray-900"
                        >
                            Timesheets
                        </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-700">{user?.name || 'User'}</span>
                        <Button variant="secondary" size="sm" onClick={logout}>
                            Sign out
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="rounded-lg bg-white p-8 shadow-sm">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">This week's timesheet</h2>
                            <p className="mt-1 text-sm text-gray-500">{weekData.dateRange}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <div className="text-sm font-semibold text-gray-900">
                                    {totalHours}/{weekData.maxHours} hrs
                                </div>
                                <div className="mt-1 h-2 w-32 rounded-full bg-gray-200">
                                    <div
                                        className="h-2 rounded-full bg-orange-500"
                                        style={{ width: `${(totalHours / weekData.maxHours) * 100}%` }}
                                    />
                                </div>
                            </div>
                            <div className="text-sm text-gray-500">
                                {Math.round((totalHours / weekData.maxHours) * 100)}%
                            </div>
                        </div>
                    </div>

                    {/* Task List - Show all 5 weekdays */}
                    <div className="space-y-6">
                        {weekdays.map((weekday) => {
                            const dayTasks = groupedTasks[weekday.date] || [];

                            return (
                                <div key={weekday.date}>
                                    <h3 className="mb-3 text-base font-semibold text-gray-900">{weekday.date}</h3>
                                    <div className="space-y-2">
                                        {/* Task list - tasks appear first */}
                                        {dayTasks.map((task) => (
                                            <div
                                                key={task.id}
                                                className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 hover:bg-gray-50"
                                            >
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900">{task.name}</p>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <span className="text-sm text-gray-500">{task.hours} hrs</span>
                                                    <button className="rounded bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100">
                                                        {task.project}
                                                    </button>
                                                    <div className="relative">
                                                        <button
                                                            onClick={() => setOpenMenuId(openMenuId === task.id ? null : task.id)}
                                                            className="text-gray-400 hover:text-gray-600"
                                                        >
                                                            <MoreVertical className="h-4 w-4" />
                                                        </button>
                                                        {openMenuId === task.id && (
                                                            <div className="absolute right-0 mt-2 w-32 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                                                                <div className="py-1">
                                                                    <button
                                                                        onClick={() => handleEditTask(task)}
                                                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteTask(task.id)}
                                                                        className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Add new task button at bottom */}
                                        <button
                                            onClick={() => {
                                                setSelectedDate(weekday.fullDate);
                                                setIsModalOpen(true);
                                            }}
                                            className="flex w-full items-center justify-center rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 py-3 text-sm font-medium text-blue-600 hover:bg-blue-100"
                                        >
                                            + Add new task
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>

            <TimesheetModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedDate(null);
                    setEditingTask(null);
                }}
                onSubmit={handleAddTask}
                initialData={
                    editingTask
                        ? {
                            startDate: editingTask.date,
                            projectName: editingTask.project,
                            typeOfWork: editingTask.name,
                            description: '',
                            hours: editingTask.hours,
                        }
                        : selectedDate
                            ? { startDate: selectedDate }
                            : null
                }
            />

            <Footer />
        </div>
    );
}
