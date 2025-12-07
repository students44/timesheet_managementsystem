import { ChevronDown } from 'lucide-react';

export function Select({ children, className = '', ...props }) {
    return (
        <div className="relative inline-block">
            <select
                className={`appearance-none rounded border border-gray-300 py-2 pl-5 pr-10 text-sm text-gray-700 bg-white  ${className}`}
                {...props}
            >
                {children}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
        </div>
    );
}
