import './ui.css';
import { useState } from 'react'

const TextField = ({ value, onClick, backgroundColor, iconLeft, iconRight, borderRadius, placeholder, width, type, onChange }) => {
    return <>
        <div
            onClick={onClick}
            style={{
                width: width,
                backgroundColor: backgroundColor,
                border: "1px solid rgb(172, 177, 181)",
                outline: "none",
                overflow: "hidden",
                borderRadius: borderRadius,
                padding: "6px",
                display: "flex",
                alignItems: "center",
                gap: "3px"
            }}>
            {iconLeft}
            <input
                style={{
                    width: "100%",
                    color: "black",
                    fontSize: "14px",
                    border: "none",
                    outline: "none",
                }}
                type={type || "text"}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {iconRight}
        </div>
    </>;
};

export default TextField;
