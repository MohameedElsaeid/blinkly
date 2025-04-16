import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {analyticsService} from '../services';

export function useAnalytics() {
    const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>({
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        end: new Date()
    });

    // Get all clicks query
    const {
        data: allClicks,
        isLoading: isLoadingAllClicks,
        error: allClicksError,
        refetch: refetchAllClicks
    } = useQuery({
        queryKey: ['allClicks'],
        queryFn: analyticsService.getAllClicks,
    });

    // Get clicks by device query
    const {
        data: clicksByDevice,
        isLoading: isLoadingClicksByDevice,
        error: clicksByDeviceError,
        refetch: refetchClicksByDevice
    } = useQuery({
        queryKey: ['clicksByDevice'],
        queryFn: analyticsService.getClicksByDevice,
    });

    // Get clicks by browser query
    const {
        data: clicksByBrowser,
        isLoading: isLoadingClicksByBrowser,
        error: clicksByBrowserError,
        refetch: refetchClicksByBrowser
    } = useQuery({
        queryKey: ['clicksByBrowser'],
        queryFn: analyticsService.getClicksByBrowser,
    });

    // Get clicks by country query
    const {
        data: clicksByCountry,
        isLoading: isLoadingClicksByCountry,
        error: clicksByCountryError,
        refetch: refetchClicksByCountry
    } = useQuery({
        queryKey: ['clicksByCountry'],
        queryFn: analyticsService.getClicksByCountry,
    });

    // Get link clicks by date range query function
    const getLinkClicksByDateRange = (linkId: string) => {
        return useQuery({
            queryKey: ['linkClicksByDate', linkId, dateRange.start, dateRange.end],
            queryFn: () => analyticsService.getClicksByDateRange(linkId, dateRange.start, dateRange.end),
            enabled: !!linkId,
        });
    };

    // Get clicks for a specific link query function
    const getClicksForLink = (linkId: string) => {
        return useQuery({
            queryKey: ['clicksForLink', linkId],
            queryFn: () => analyticsService.getClicksForLink(linkId),
            enabled: !!linkId,
        });
    };

    return {
        allClicks,
        isLoadingAllClicks,
        allClicksError,
        refetchAllClicks,

        clicksByDevice,
        isLoadingClicksByDevice,
        clicksByDeviceError,
        refetchClicksByDevice,

        clicksByBrowser,
        isLoadingClicksByBrowser,
        clicksByBrowserError,
        refetchClicksByBrowser,

        clicksByCountry,
        isLoadingClicksByCountry,
        clicksByCountryError,
        refetchClicksByCountry,

        dateRange,
        setDateRange,
        getLinkClicksByDateRange,
        getClicksForLink,

        isLoading: isLoadingAllClicks || isLoadingClicksByDevice || isLoadingClicksByBrowser || isLoadingClicksByCountry
    };
}
