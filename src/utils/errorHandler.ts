
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { errorMap } from './errorMap';

export const handleProductionErrors = (error: AxiosError) => {
  // Handle network errors
  if (!error.response) {
    toast.error('Network error. Please check your connection.');
    return;
  }
  
  const status = error.response.status;
  const errorData = error.response.data as any;
  const errorCode = errorData?.code;
  
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
    
    window.location.href = '/login?session_expired=true';
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
    toast.error('Server error. Please try again later.');
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
};

export const isProduction = () => {
  return import.meta.env.VITE_ENV === 'production';
};
