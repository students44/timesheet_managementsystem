import { clsx } from 'clsx';

export function TimesheetTable({ timesheets, onEdit, onView }) {
    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Week #
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {timesheets.map((entry) => (
                        <tr key={entry.id} className="hover:bg-gray-50">
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                {entry.weekNumber}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                {entry.startDate} - {entry.endDate}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                                <span
                                    className={clsx(
                                        'inline-flex rounded-full px-2 text-xs font-semibold leading-5',
                                        {
                                            'bg-green-100 text-green-800': entry.status === 'COMPLETED',
                                            'bg-yellow-100 text-yellow-800': entry.status === 'INCOMPLETE',
                                            'bg-red-100 text-red-800': entry.status === 'MISSING',
                                        }
                                    )}
                                >
                                    {entry.status}
                                </span>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                {entry.status === 'MISSING' ? (
                                    <button
                                        onClick={() => onEdit(entry)}
                                        className="text-blue-600 hover:text-blue-900"
                                    >
                                        Create
                                    </button>
                                ) : entry.status === 'INCOMPLETE' ? (
                                    <button
                                        onClick={() => onEdit(entry)}
                                        className="text-blue-600 hover:text-blue-900"
                                    >
                                        Update
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => onView(entry)}
                                        className="text-blue-600 hover:text-blue-900"
                                    >
                                        View
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
