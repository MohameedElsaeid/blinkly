
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { errorMap } from '../../utils/errorMap';

export class ApiErrorHandler {
  /**
   * Handles API errors and takes appropriate actions based on error type
   */
  handleApiError(error: AxiosError): void {
    // Handle network errors
    if (!error.response) {
      const errorMessage = this.getNetworkErrorMessage(error);
      toast.error(errorMessage);
      console.error('Network error details:', {
        message: error.message,
        code: error.code,
        requestURL: error.config?.url,
        requestMethod: error.config?.method
      });
      return;
    }

    const status = error.response.status;
    const errorData = error.response.data as any;
    const errorCode = errorData?.code;

    console.log('API Error Handler:', { 
      status, 
      errorCode, 
      errorMessage: errorData?.message,
      url: error.config?.url
    });

    // Check for CORS errors
    if (status === 403 && error.response.headers['x-cors-error']) {
      window.location.href = '/cors-error';
      return;
    }

    // Handle authentication errors
    if (status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('storage'));

      if (window.location.pathname.includes('/dashboard')) {
        window.location.href = '/login?session_expired=true';
      } else {
        toast.error('Your session has expired. Please login again.');
      }
      return;
    }

    // Handle forbidden errors
    else if (status === 403) {
      toast.error('You do not have permission to perform this action.');
    }
    // Handle rate limiting
    else if (status === 429) {
      toast.error('Too many requests. Please try again later.');
    }
    // Handle server errors
    else if (status >= 500) {
      toast.error(`Server error (${status}). Please try again later.`);
    }
    // Handle mapped errors
    else if (errorCode && errorMap[errorCode]) {
      toast.error(errorMap[errorCode]);
    }
    // Handle unknown errors
    else {
      const errorMessage = errorData?.message || 'An unexpected error occurred.';
      toast.error(errorMessage);
    }
  }

  /**
   * Get a user-friendly network error message
   */
  private getNetworkErrorMessage(error: AxiosError): string {
    if (error.code === 'ECONNABORTED') {
      return 'Request timed out. Please check your connection and try again.';
    } else if (error.code === 'ERR_NETWORK') {
      return 'Network error. Please check your internet connection.';
    } else if (error.code === 'ERR_BAD_REQUEST') {
      return 'Bad request. Please try again.';
    } else {
      return 'Network error. Please check your connection.';
    }
  }
}

export const apiErrorHandler = new ApiErrorHandler();
