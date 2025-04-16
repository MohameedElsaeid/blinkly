
/**
 * Set a cookie with the given name, value, and expiration days
 */
export const setCookie = (name: string, value: string, days: number = 365) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

/**
 * Get a cookie by name
 */
export const getCookie = (name: string): string | null => {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
};

/**
 * Delete a cookie by name
 */
export const deleteCookie = (name: string) => {
    setCookie(name, '', -1);
};

/**
 * Store Cloudflare headers in localStorage
 */
export const storeCloudflareHeaders = (headers: Record<string, string>) => {
    // Store common Cloudflare headers
    const cfHeaders = [
        'cf-ipcountry',
        'cf-ray',
        'cf-visitor',
        'cf-connecting-ip',
        'cf-device-type',
        'cf-metro-code',
        'cf-region',
        'cf-region-code',
        'cf-ipcity',
        'cf-ipcontinent',
        'cf-iplatitude',
        'cf-iplongitude',
        'cf-iptimezone'
    ];
    
    cfHeaders.forEach(header => {
        const value = headers[header] || headers[header.toUpperCase()];
        if (value) {
            localStorage.setItem(header, value);
        }
    });
};

/**
 * Get all stored Cloudflare headers
 */
export const getCloudflareHeaders = (): Record<string, string> => {
    const headers: Record<string, string> = {};
    
    // List of Cloudflare headers to check
    const cfHeaders = [
        'cf-ipcountry',
        'cf-ray',
        'cf-visitor',
        'cf-connecting-ip',
        'cf-device-type',
        'cf-metro-code',
        'cf-region',
        'cf-region-code',
        'cf-ipcity',
        'cf-ipcontinent',
        'cf-iplatitude',
        'cf-iplongitude',
        'cf-iptimezone'
    ];
    
    cfHeaders.forEach(header => {
        const value = localStorage.getItem(header);
        if (value) {
            // Convert to the format expected by the API (CF-IPCountry instead of cf-ipcountry)
            const formattedHeader = 'CF-' + header.substring(3).charAt(0).toUpperCase() + header.substring(4);
            headers[formattedHeader] = value;
        }
    });
    
    return headers;
};
