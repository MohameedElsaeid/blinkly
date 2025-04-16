import {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {toast} from 'sonner';
import {linksService} from '../services';
import {CreateLinkParams, UpdateLinkParams} from '../types';

export function useLinks() {
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();

    // Get all links query
    const {
        data: links,
        isLoading: isLoadingLinks,
        error: linksError,
        refetch: refetchLinks
    } = useQuery({
        queryKey: ['links'],
        queryFn: linksService.getAllLinks,
    });

    // Get recent links query
    const getRecentLinks = (limit: number = 3) => {
        return useQuery({
            queryKey: ['recentLinks', limit],
            queryFn: () => linksService.getRecentLinks(limit),
        });
    };

    // Create link mutation
    const createLinkMutation = useMutation({
        mutationFn: (linkData: CreateLinkParams) => {
            setIsLoading(true);
            return linksService.createLink(linkData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['links']});
            queryClient.invalidateQueries({queryKey: ['recentLinks']});
            toast.success('Link created successfully!');
            setIsLoading(false);
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to create link. Please try again.';
            toast.error(message);
            setIsLoading(false);
        },
    });

    // Update link mutation
    const updateLinkMutation = useMutation({
        mutationFn: ({id, data}: { id: string; data: UpdateLinkParams }) => {
            setIsLoading(true);
            return linksService.updateLink(id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['links']});
            queryClient.invalidateQueries({queryKey: ['recentLinks']});
            toast.success('Link updated successfully!');
            setIsLoading(false);
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to update link. Please try again.';
            toast.error(message);
            setIsLoading(false);
        },
    });

    // Delete link mutation
    const deleteLinkMutation = useMutation({
        mutationFn: (id: string) => {
            setIsLoading(true);
            return linksService.deleteLink(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['links']});
            queryClient.invalidateQueries({queryKey: ['recentLinks']});
            toast.success('Link deleted successfully!');
            setIsLoading(false);
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to delete link. Please try again.';
            toast.error(message);
            setIsLoading(false);
        },
    });

    return {
        links,
        isLoadingLinks,
        linksError,
        refetchLinks,
        getRecentLinks,
        createLink: createLinkMutation.mutate,
        updateLink: updateLinkMutation.mutate,
        deleteLink: deleteLinkMutation.mutate,
        isLoading: isLoading || isLoadingLinks || createLinkMutation.isPending || updateLinkMutation.isPending || deleteLinkMutation.isPending
    };
}
