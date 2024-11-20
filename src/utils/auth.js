const logout = () => {
    // Clear all auth-related items from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('username');
    localStorage.removeItem('redirectAfterLogin');
};

export default logout; 