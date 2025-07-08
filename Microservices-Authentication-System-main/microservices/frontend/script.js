// API URLs
const API_URLS = {
    auth: 'http://localhost:8000',
    forgotPassword: 'http://localhost:8001',
    updatePassword: 'http://localhost:8002'
};

// DOM Elements
const loginContainer = document.getElementById('login-container');
const registerContainer = document.getElementById('register-container');
const forgotPasswordContainer = document.getElementById('forgot-password-container');
const resetPasswordContainer = document.getElementById('reset-password-container');
const updatePasswordContainer = document.getElementById('update-password-container');
const dashboardContainer = document.getElementById('dashboard-container');

// Form Elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const forgotPasswordForm = document.getElementById('forgot-password-form');
const resetPasswordForm = document.getElementById('reset-password-form');
const updatePasswordForm = document.getElementById('update-password-form');

// Message Elements
const loginMessage = document.getElementById('login-message');
const registerMessage = document.getElementById('register-message');
const forgotMessage = document.getElementById('forgot-message');
const resetMessage = document.getElementById('reset-message');
const updateMessage = document.getElementById('update-message');
const dashboardMessage = document.getElementById('dashboard-message');

// Navigation Links
document.getElementById('show-register').addEventListener('click', () => {
    hideAllContainers();
    registerContainer.style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', () => {
    hideAllContainers();
    loginContainer.style.display = 'block';
});

document.getElementById('show-forgot-password').addEventListener('click', () => {
    hideAllContainers();
    forgotPasswordContainer.style.display = 'block';
});

document.getElementById('back-to-login').addEventListener('click', () => {
    hideAllContainers();
    loginContainer.style.display = 'block';
});

document.getElementById('reset-back-to-login').addEventListener('click', () => {
    hideAllContainers();
    loginContainer.style.display = 'block';
});

document.getElementById('update-back').addEventListener('click', () => {
    hideAllContainers();
    dashboardContainer.style.display = 'block';
});

document.getElementById('update-password-btn').addEventListener('click', () => {
    hideAllContainers();
    updatePasswordContainer.style.display = 'block';
});

document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('token');
    hideAllContainers();
    loginContainer.style.display = 'block';
    showMessage(loginMessage, 'You have been logged out.', 'success');
});

// Helper Functions
function hideAllContainers() {
    loginContainer.style.display = 'none';
    registerContainer.style.display = 'none';
    forgotPasswordContainer.style.display = 'none';
    resetPasswordContainer.style.display = 'none';
    updatePasswordContainer.style.display = 'none';
    dashboardContainer.style.display = 'none';
}

function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `message ${type}`;
    element.style.display = 'block';
    
    // Clear message after 5 seconds
    setTimeout(() => {
        element.style.display = 'none';
    }, 5000);
}

// API Functions
async function login(email, password) {
    try {
        const formData = new FormData();
        formData.append('username', email);
        formData.append('password', password);

        const response = await fetch(`${API_URLS.auth}/token`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.detail || 'Login failed');
        }
        
        localStorage.setItem('token', data.access_token);
        return data;
    } catch (error) {
        throw error;
    }
}

async function register(fullName, email, password) {
    try {
        const response = await fetch(`${API_URLS.auth}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                full_name: fullName,
                email: email,
                password: password
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.detail || 'Registration failed');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
}

async function getUserInfo() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_URLS.auth}/users/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.detail || 'Failed to get user information');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
}

async function requestPasswordReset(email) {
    try {
        const response = await fetch(`${API_URLS.forgotPassword}/request-reset?email=${email}`, {
            method: 'POST'
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.detail || 'Failed to request password reset');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
}

async function resetPassword(token, newPassword) {
    try {
        const response = await fetch(`${API_URLS.forgotPassword}/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token,
                new_password: newPassword
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.detail || 'Failed to reset password');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
}

async function updatePassword(currentPassword, newPassword) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_URLS.updatePassword}/update-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                current_password: currentPassword,
                new_password: newPassword
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.detail || 'Failed to update password');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
}

// Event Listeners
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    try {
        await login(email, password);
        
        const userInfo = await getUserInfo();
        document.getElementById('user-name').textContent = userInfo.full_name;
        document.getElementById('user-email').textContent = userInfo.email;
        
        hideAllContainers();
        dashboardContainer.style.display = 'block';
        showMessage(dashboardMessage, 'Login successful!', 'success');
    } catch (error) {
        showMessage(loginMessage, error.message, 'error');
    }
});

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const fullName = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    try {
        await register(fullName, email, password);
        showMessage(registerMessage, 'Registration successful! You can now login.', 'success');
        
        // Clear form
        document.getElementById('register-name').value = '';
        document.getElementById('register-email').value = '';
        document.getElementById('register-password').value = '';
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
            hideAllContainers();
            loginContainer.style.display = 'block';
        }, 2000);
    } catch (error) {
        showMessage(registerMessage, error.message, 'error');
    }
});

forgotPasswordForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const email = document.getElementById('forgot-email').value;
    
    try {
        await requestPasswordReset(email);
        showMessage(forgotMessage, 'Password reset link has been sent to your email.', 'success');
        
        // Clear form
        document.getElementById('forgot-email').value = '';
        
        // Show reset password form
        setTimeout(() => {
            hideAllContainers();
            resetPasswordContainer.style.display = 'block';
        }, 2000);
    } catch (error) {
        showMessage(forgotMessage, error.message, 'error');
    }
});

resetPasswordForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const token = document.getElementById('reset-token').value;
    const newPassword = document.getElementById('new-password').value;
    
    try {
        await resetPassword(token, newPassword);
        showMessage(resetMessage, 'Password has been reset successfully. You can now login with your new password.', 'success');
        
        // Clear form
        document.getElementById('reset-token').value = '';
        document.getElementById('new-password').value = '';
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
            hideAllContainers();
            loginContainer.style.display = 'block';
        }, 3000);
    } catch (error) {
        showMessage(resetMessage, error.message, 'error');
    }
});

updatePasswordForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('update-new-password').value;
    
    try {
        await updatePassword(currentPassword, newPassword);
        showMessage(updateMessage, 'Password has been updated successfully.', 'success');
        
        // Clear form
        document.getElementById('current-password').value = '';
        document.getElementById('update-new-password').value = '';
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
            hideAllContainers();
            dashboardContainer.style.display = 'block';
        }, 2000);
    } catch (error) {
        showMessage(updateMessage, error.message, 'error');
    }
});

// Check if user is logged in
window.addEventListener('load', async () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const userInfo = await getUserInfo();
            document.getElementById('user-name').textContent = userInfo.full_name;
            document.getElementById('user-email').textContent = userInfo.email;
            
            hideAllContainers();
            dashboardContainer.style.display = 'block';
        } catch (error) {
            localStorage.removeItem('token');
            hideAllContainers();
            loginContainer.style.display = 'block';
        }
    } else {
        hideAllContainers();
        loginContainer.style.display = 'block';
    }
}); 