// 🔥 Fake validation: 只要填了，就通过

export const isValidCreditCard = (number) => {
    return number.trim() !== "";
};

export const isValidPhoneNumber = (phone) => {
    return phone.trim() !== "";
};

export const isValidEmail = (email) => {
    return email.trim() !== "";
};

export const isValidFullName = (name) => {
    return name.trim() !== "";
};

export const isValidAddress = (address) => {
    return address.trim() !== "";
};

export const isValidCity = (city) => {
    return city.trim() !== "";
};

export const isValidState = (state) => {
    return state.trim() !== "";
};

export const isValidZipCode = (zip) => {
    return zip.trim() !== "";
};

export const isValidPassword = (password) => {
    return password.trim() !== "";
};

export const isValidCVV = (cvv) => {
    return cvv.trim() !== "";
};

export const isValidExpiryDate = (expiry) => {
    return expiry.trim() !== "";
};
