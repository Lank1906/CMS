import './ui.css';
import { useState } from 'react'

const TextField = ({ value, onClick, backgroundColor, iconLeft, iconRight, borderRadius, placeholder, width }) => {
    const [v, setValue] = useState(value || "");
    return <>
        <div
            onClick={onClick}
            style={{
                
                backgroundColor: backgroundColor,
                border: "1px solid rgb(172, 177, 181)",
                outline: "none",
                overflow: "hidden",
                borderRadius: borderRadius,
                padding: "6px",
                display: "inline-flex",
                alignItems: "center",
                gap: "3px"
            }}>
            {iconLeft}
            <input
                style={{
                    width: width,
                    color: "black",
                    fontSize: "14px",
                    border: "none",
                    outline: "none",
                }}
                placeholder={placeholder}
                value={v}
                onChange={(e)=>setValue(e.target.value)}
            />
            {iconRight}
        </div>
    </>;
};

export default TextField;
