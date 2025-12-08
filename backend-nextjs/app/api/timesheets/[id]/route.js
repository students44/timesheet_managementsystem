import { NextResponse } from 'next/server';
import { timesheets } from '@/lib/data';
import { calculateWeekData } from '@/lib/helpers';

// GET single timesheet by ID
export async function GET(request, { params }) {
    const { id } = (await params);
    const timesheet = timesheets.find(t => t.id === id);

    if (!timesheet) {
        return NextResponse.json(
            { message: 'Timesheet not found' },
            { status: 404 }
        );
    }

    return NextResponse.json(timesheet);
}

// PUT - Update timesheet
export async function PUT(request, { params }) {
    try {
        const { id } = (await params);
        const updatedData = await request.json();

        const index = timesheets.findIndex(t => t.id === id);

        if (index === -1) {
            return NextResponse.json(
                { message: 'Timesheet not found' },
                { status: 404 }
            );
        }

        // Recalculate week data if start date changed
        if (updatedData.startDate && updatedData.startDate !== timesheets[index].startDate) {
            const { weekNumber, endDate } = calculateWeekData(updatedData.startDate);
            updatedData.weekNumber = weekNumber;
            updatedData.endDate = endDate;
        }

        // Update timesheet
        timesheets[index] = {
            ...timesheets[index],
            ...updatedData,
            hours: updatedData.hours ? parseInt(updatedData.hours) : timesheets[index].hours,
            status: 'COMPLETED', // Mark as completed when updated
        };

        console.log('Updated timesheet:', timesheets[index]);
        return NextResponse.json(timesheets[index]);
    } catch (error) {
        return NextResponse.json(
            { message: 'An error occurred' },
            { status: 500 }
        );
    }
}

// DELETE - Delete timesheet
export async function DELETE(request, { params }) {
    const { id } = (await params);
    const index = timesheets.findIndex(t => t.id === id);

    if (index === -1) {
        return NextResponse.json(
            { message: 'Timesheet not found' },
            { status: 404 }
        );
    }

    timesheets.splice(index, 1);

    console.log('Timesheet deleted successfully');
    return NextResponse.json({
        success: true,
        message: 'Timesheet deleted successfully'
    });
}
