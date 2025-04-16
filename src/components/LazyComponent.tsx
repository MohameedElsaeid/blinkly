
import React, { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyComponentProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export const LazyComponent: React.FC<LazyComponentProps> = ({
    children,
    fallback = <Skeleton className="w-full h-32 rounded-md" />
}) => {
    return (
        <Suspense fallback={fallback}>
            {children}
        </Suspense>
    );
};
