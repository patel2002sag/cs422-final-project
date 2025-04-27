// Credit card validation using Luhn algorithm
export const isValidCreditCard = (number) => {
    const sanitized = number.replace(/\D/g, '');
    if (sanitized.length < 13 || sanitized.length > 19) return false;

    let sum = 0;
    let isEven = false;

    for (let i = sanitized.length - 1; i >= 0; i--) {
        let digit = parseInt(sanitized[i]);

        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isEven = !isEven;
    }

    return sum % 10 === 0;
};

// Phone number validation (US format)
export const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneRegex.test(phone);
};

// Email validation
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Full name validation (at least first and last name)
export const isValidFullName = (name) => {
    const nameParts = name.trim().split(/\s+/);
    return nameParts.length >= 2 && nameParts.every(part => part.length >= 2);
};

// Address validation
export const isValidAddress = (address) => {
    return address.trim().length >= 10;
};

// City validation
export const isValidCity = (city) => {
    return city.trim().length >= 2;
};

// State validation (US states)
export const isValidState = (state) => {
    const stateRegex = /^[A-Z]{2}$/;
    return stateRegex.test(state);
};

// ZIP code validation (US format)
export const isValidZipCode = (zip) => {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zip);
};

// Password validation (minimum 6 characters)
export const isValidPassword = (password) => {
    return password.length >= 6;
};

// CVV validation (3 or 4 digits)
export const isValidCVV = (cvv) => {
    const cvvRegex = /^\d{3,4}$/;
    return cvvRegex.test(cvv);
};

// Expiry date validation (MM/YY format, not expired)
export const isValidExpiryDate = (expiry) => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(expiry)) return false;

    const [month, year] = expiry.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    const expYear = parseInt(year);
    const expMonth = parseInt(month);

    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;

    return true;
}; 