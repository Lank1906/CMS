import { useState } from "react";
import './dialog.css';
import { AlertCircle } from "lucide-react";
import Button from "../ui/Button";
const ConfirmDialog = ({ closeBtnColor, confirmBtnColor, icon, open, onClose, onConfirm, title = "Confirm", message = "Are you sure you want to perform this action?" }) => {
    return (
        <div open={open} onClose={onClose} onClick={onClose} className={`dialog-backdrop ${open ? "show" : "hide"}`}>
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="dialog-container">
                <div className="dialog-title"><div className="dialog-icon">{icon || <AlertCircle size={50} color="rgb(56, 141, 202)" />}</div><p>{title}</p></div>
                <div className="dialog-message">{message}</div>
                <div className="dialog-btns">
                    <Button
                        backgroundColor={confirmBtnColor || "rgb(237, 72, 72)"}
                        onClick={onClose}
                        value={"Confirm"}
                    />
                    <Button
                        backgroundColor={confirmBtnColor || "white"}
                        color={"black"}
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        value={"Close"}
                    />
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
