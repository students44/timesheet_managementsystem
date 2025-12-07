import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { X, Plus, Minus } from 'lucide-react';
import { useEffect } from 'react';

const timesheetSchema = z.object({
    projectName: z.string().min(1, 'Project is required'),
    typeOfWork: z.string().min(1, 'Type of work is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    hours: z.number().min(1, 'Hours must be at least 1').max(24, 'Max 24 hours'),
});

export function TimesheetModal({ isOpen, onClose, onSubmit, initialData }) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(timesheetSchema),
        defaultValues: {
            projectName: '',
            typeOfWork: '',
            description: '',
            hours: 8,
        },
    });

    useEffect(() => {
        if (isOpen && initialData) {
            reset({
                projectName: initialData.projectName || '',
                typeOfWork: initialData.typeOfWork || '',
                description: initialData.description || '',
                hours: initialData.hours || 8,
            });
        } else if (isOpen) {
            reset({
                projectName: '',
                typeOfWork: '',
                description: '',
                hours: 8,
            });
        }
    }, [isOpen, initialData, reset]);

    const hours = watch('hours');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-xl font-semibold text-gray-900">Add New Entry</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Select Project *
                            </label>
                            <select
                                {...register('projectName')}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                            >
                                <option value="">Project Name</option>
                                <option value="Homepage Development">Homepage Development</option>
                                <option value="Mobile App">Mobile App</option>
                                <option value="Internal Tool">Internal Tool</option>
                            </select>
                            {errors.projectName && (
                                <p className="mt-1 text-sm text-red-600">{errors.projectName.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Type of Work *
                            </label>
                            <select
                                {...register('typeOfWork')}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                            >
                                <option value="">Select Type</option>
                                <option value="Development">Development</option>
                                <option value="Bug fixes">Bug fixes</option>
                                <option value="Meeting">Meeting</option>
                            </select>
                            {errors.typeOfWork && (
                                <p className="mt-1 text-sm text-red-600">{errors.typeOfWork.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Task description *
                            </label>
                            <textarea
                                {...register('description')}
                                rows={4}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                placeholder="Write text here ..."
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                            )}
                            <p className="mt-1 text-xs text-gray-500">A note for extra info</p>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Hours *
                            </label>
                            <div className="flex items-center space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setValue('hours', Math.max(1, hours - 1))}
                                    className="rounded-md border border-gray-300 p-2 hover:bg-gray-50"
                                >
                                    <Minus className="h-4 w-4 text-gray-600" />
                                </button>
                                <div className="flex h-10 w-16 items-center justify-center rounded-md border border-gray-300 bg-white text-sm font-medium">
                                    {hours}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setValue('hours', Math.min(24, hours + 1))}
                                    className="rounded-md border border-gray-300 p-2 hover:bg-gray-50"
                                >
                                    <Plus className="h-4 w-4 text-gray-600" />
                                </button>
                            </div>
                            {errors.hours && (
                                <p className="mt-1 text-sm text-red-600">{errors.hours.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 flex space-x-3">
                        <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                            Add entry
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            className="flex-1"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
