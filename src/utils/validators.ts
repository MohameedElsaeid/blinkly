import {getCountries, getCountryCallingCode, isValidPhoneNumber} from 'libphonenumber-js';
import * as countries from 'i18n-iso-countries';

// Initialize the countries library with English language
// Using dynamic import for language file to avoid CommonJS require
export const initCountries = async () => {
    try {
        const enLocale = await import('i18n-iso-countries/langs/en.json');
        countries.registerLocale(enLocale);
        return true;
    } catch (error) {
        console.error('Failed to initialize countries:', error);
        return false;
    }
};

// Ensure countries are initialized
initCountries();

export const emailValidator = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) && email.length <= 255;
};

export const passwordValidator = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    return passwordRegex.test(password) && password.length >= 8 && password.length <= 32;
};

export const nameValidator = (name: string): boolean => {
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
    return nameRegex.test(name) && name.length >= 2 && name.length <= 50;
};

export const countryCodeValidator = (code: string): boolean => {
    const codeRegex = /^\+[1-9]\d{0,2}$/;
    return codeRegex.test(code);
};

export const phoneValidator = (phone: string, countryCode: string): boolean => {
    try {
        // Get the country from the country code (e.g., +1 -> US)
        // This is a simplified approach - a more robust solution might use a mapping
        const fullNumber = countryCode + phone.replace(/\D/g, '');
        return isValidPhoneNumber(fullNumber);
    } catch (error) {
        return false;
    }
};

export const formatPhoneWithCountryCode = (phone: string, countryCode: string): string => {
    // Remove any non-digit characters from the phone number
    const digitsOnly = phone.replace(/\D/g, '');
    return `${countryCode}${digitsOnly}`;
};

export const countryValidator = (country: string): boolean => {
    return countries.isValid(country);
};

export const getCountriesList = () => {
    try {
        return Object.entries(countries.getNames('en'))
            .map(([code, name]) => ({code, name}))
            .sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
        console.error('Error getting countries list:', error);
        return [];
    }
};

export const getCountryCodesList = () => {
    try {
        // Get all country codes from libphonenumber-js
        const countryCodes = getCountries().map(countryCode => {
            try {
                const callingCode = getCountryCallingCode(countryCode);
                const countryName = countries.getName(countryCode, 'en') || countryCode;
                return {
                    code: `+${callingCode}`,
                    name: `${countryName} (+${callingCode})`,
                    countryCode: countryCode
                };
            } catch (error) {
                console.error(`Error getting calling code for ${countryCode}:`, error);
                return null;
            }
        }).filter(Boolean);

        return countryCodes.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
        console.error('Error getting country codes list:', error);
        // Return a basic list as fallback
        return [
            {code: '+1', name: 'United States & Canada (+1)', countryCode: 'US'},
            {code: '+44', name: 'United Kingdom (+44)', countryCode: 'GB'},
            {code: '+61', name: 'Australia (+61)'},
            {code: '+33', name: 'France (+33)'},
            {code: '+49', name: 'Germany (+49)'},
            {code: '+81', name: 'Japan (+81)'},
            {code: '+86', name: 'China (+86)'},
            {code: '+91', name: 'India (+91)'},
            {code: '+55', name: 'Brazil (+55)'},
            {code: '+52', name: 'Mexico (+52)'},
            {code: '+27', name: 'South Africa (+27)'},
            {code: '+7', name: 'Russia (+7)'},
            {code: '+971', name: 'United Arab Emirates (+971)'},
            {code: '+966', name: 'Saudi Arabia (+966)'},
            {code: '+82', name: 'South Korea (+82)'},
            {code: '+65', name: 'Singapore (+65)'},
            {code: '+64', name: 'New Zealand (+64)'},
            {code: '+31', name: 'Netherlands (+31)'},
            {code: '+39', name: 'Italy (+39)'},
            {code: '+34', name: 'Spain (+34)'},
        ];
    }
};

export const getPasswordStrength = (password: string): { score: number; feedback: string } => {
    if (!password) {
        return {score: 0, feedback: 'Password is required'};
    }

    let score = 0;
    let feedback = '';

    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;

    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    // Variety check
    const uniqueChars = new Set(password).size;
    if (uniqueChars > 6) score += 1;

    // Feedback based on score
    if (score <= 2) {
        feedback = 'Weak password - try adding numbers and special characters';
    } else if (score <= 4) {
        feedback = 'Fair password - add more variety for better security';
    } else if (score <= 6) {
        feedback = 'Good password - meets basic security requirements';
    } else {
        feedback = 'Strong password - excellent security';
    }

    return {
        score: Math.min(score, 7), // Normalize to 0-7 scale
        feedback
    };
};
