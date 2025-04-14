
import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.blinkly.app';
const CSRF_ENDPOINT = import.meta.env.VITE_CSRF_ENDPOINT || '/auth/csrf-token';

class CsrfTokenService {
  private csrfPromise: Promise<string> | null = null;

  /**
   * Fetches a CSRF token from the server or returns a cached one
   */
  async fetchCsrfToken(): Promise<string> {
    if (!this.csrfPromise) {
      console.log('Fetching CSRF token from:', `${API_URL}${CSRF_ENDPOINT}`);
      this.csrfPromise = this.doFetchCsrfToken()
        .catch(error => {
          console.error('CSRF token fetch failed:', error);
          this.csrfPromise = null; // Reset for next attempt
          throw new Error('Failed to obtain CSRF token');
        });
    }

    return this.csrfPromise;
  }

  /**
   * Performs the actual token fetch from the server
   */
  private async doFetchCsrfToken(): Promise<string> {
    try {
      // Check if we already have a token in cookies
      const existingToken = Cookies.get('XSRF-TOKEN');
      if (existingToken) {
        console.log('Using existing CSRF token from cookies');
        return existingToken;
      }

      // Fetch new token from server
      console.log('Making CSRF token request to:', `${API_URL}${CSRF_ENDPOINT}`);
      const response = await axios.get(`${API_URL}${CSRF_ENDPOINT}`, {
        withCredentials: true
      });

      console.log('CSRF token response:', response.data);
      const token = response.data.token;
      if (token) {
        console.log('Setting CSRF token in cookies');
        Cookies.set('XSRF-TOKEN', token, {expires: 1}); // 1 day expiry
      } else {
        console.warn('No token found in CSRF response');
      }

      return token || this.generateCsrfToken();
    } catch (error) {
      console.error('Failed to fetch CSRF token:', error);
      // Return the simple generated token as fallback
      return this.generateCsrfToken();
    }
  }

  /**
   * Generates a CSRF token as fallback when server fetch fails
   */
  private generateCsrfToken(): string {
    // Simple CSRF token generation
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Invalidates the current CSRF token, forcing a new fetch
   */
  invalidateToken(): void {
    this.csrfPromise = null;
  }
}

export const csrfTokenService = new CsrfTokenService();
