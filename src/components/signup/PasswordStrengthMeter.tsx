import {useEffect, useState} from 'react';
import {getPasswordStrength} from '@/utils/validators';

interface PasswordStrengthMeterProps {
    password: string;
}

export const PasswordStrengthMeter = ({password}: PasswordStrengthMeterProps) => {
    const [strength, setStrength] = useState({score: 0, feedback: ''});

    useEffect(() => {
        setStrength(getPasswordStrength(password));
    }, [password]);

    // Calculate width percentage based on score (0-7)
    const widthPercentage = (strength.score / 7) * 100;

    // Determine color based on score
    const getColorClass = () => {
        if (strength.score <= 2) return 'bg-red-500';
        if (strength.score <= 4) return 'bg-yellow-500';
        if (strength.score <= 6) return 'bg-green-400';
        return 'bg-green-600';
    };

    if (!password) return null;

    return (
        <div className="space-y-1 mt-1">
            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                    className={`h-full ${getColorClass()} transition-all duration-300 ease-in-out`}
                    style={{width: `${widthPercentage}%`}}
                />
            </div>
            <p className="text-xs text-gray-500">{strength.feedback}</p>
        </div>
    );
};
