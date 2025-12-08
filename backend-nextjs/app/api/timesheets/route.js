import { NextResponse } from 'next/server';
import { timesheets } from '@/lib/data';
import { calculateWeekData } from '@/lib/helpers';

// GET all timesheets
export async function GET() {
    return NextResponse.json(timesheets);
}

// POST - Create new timesheet
export async function POST(request) {
    try {
        const { projectName, typeOfWork, description, hours, startDate } = await request.json();

        // Validate required fields
        if (!projectName || !typeOfWork || !description || !hours || !startDate) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Calculate week data
        const { weekNumber, endDate } = calculateWeekData(startDate);

        // Create new timesheet
        const newTimesheet = {
            id: Date.now().toString(),
            weekNumber,
            startDate,
            endDate,
            status: 'COMPLETED',
            projectName,
            typeOfWork,
            description,
            hours: parseInt(hours),
        };

        timesheets.push(newTimesheet);

        console.log('Created timesheet:', newTimesheet);
        return NextResponse.json(newTimesheet, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: 'An error occurred' },
            { status: 500 }
        );
    }
}
