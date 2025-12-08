import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await login(data.email, data.password);

            if (!result.success) {
                setError(result.error);
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full">
            {/* Left Side - Form */}
            <div className="flex w-full flex-col justify-center bg-white px-8 py-12 lg:w-1/2 lg:px-24">
                <div className="mx-auto w-full max-w-md">
                    <h2 className="mb-2 text-3xl font-bold text-gray-900">Welcome back</h2>
                    <p className="mb-8 text-gray-500">Please enter your details to sign in.</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="name@example.com"
                            error={errors.email?.message}
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address'
                                }
                            })}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            error={errors.password?.message}
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters'
                                }
                            })}
                        />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>
                        </div>

                        {error && (
                            <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 py-3 text-white hover:bg-blue-700"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </form>
                </div>
            </div>

            <div className="hidden lg:flex flex-1 flex-col justify-center bg-blue-600 px-12 text-white">
                <div className="mx-auto max-w-lg" style={{ maxWidth: '700px' }}>
                    <h1 className="mb-6 text-5xl font-bold">ticktock</h1>
                    <p className="text-lg leading-relaxed opacity-90 w-100">
                        Introducing ticktock, our cutting-edge timesheet web application designed
                        to revolutionize how you manage employee work hours. With ticktock, you
                        can effortlessly track and monitor employee attendance and productivity
                        from anywhere, anytime, using any internet-connected device.
                    </p>
                </div>
            </div>

        </div>
    );
}
