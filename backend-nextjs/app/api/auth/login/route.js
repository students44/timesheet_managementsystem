import { NextResponse } from 'next/server';
import { users } from '@/lib/data';
import { generateToken } from '@/lib/helpers';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        console.log('🔐 Login attempt:', { email, password });
        console.log('👥 Available users:', users);

        // Find user
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return NextResponse.json(
                { message: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Generate token
        const token = generateToken(user.id);

        // Return success response
        return NextResponse.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        return NextResponse.json(
            { message: 'An error occurred' },
            { status: 500 }
        );
    }
}
