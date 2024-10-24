// components/Notify.js
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notify = () => {
    return <ToastContainer
                position="top-right"
            />;
};

// Success notification function
export const notifySuccess = (message) => {
    toast.success(message, {
        autoClose: 3000, // Closes after 3 seconds
    });
};

// Error notification function
export const notifyError = (message) => {
    toast.error(message, {
        autoClose: 3000,
    });
};

export default Notify;
