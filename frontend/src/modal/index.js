import React from "react";
import './modal.style.css'

export const Modal = ({ handleOk, isModalOpen, handleCancel, children }) => {
    if (!isModalOpen) return null;
    else return (
        <div className="modal hidden">
            { children }
            <button onClick={handleCancel} className="close-modal">&times;</button>
        </div>
    );
};