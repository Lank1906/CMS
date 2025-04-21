import './ui.css';
import { useRef } from 'react';

const Button = ({
    type,
    value,
    onClick,
    backgroundColor,
    iconLeft,
    iconRight,
    color,
    border,
    disable
}) => {
    const button = useRef();

    const handleClick = () => {
        if (button.current && !disable) {
            button.current.click();  
        }
    };

    return (
        <>
            <div
                onClick={handleClick}
                style={{
                    opacity: disable ? 0.5 : 1,
                    backgroundColor: backgroundColor || "white",
                    border: border || "1px solid rgb(77, 83, 89)",
                    outline: "none",
                    cursor: disable ? "not-allowed" : "pointer",
                    borderRadius: "5px",
                    color: color || "white",
                    fontSize: "13px",
                    fontWeight: "510",
                    padding: "5px 10px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "3px"
                }}
            >
                {iconLeft}
                {value}
                {iconRight}
                <button
                    type={type}
                    ref={button}
                    onClick={onClick}
                    style={{ display: "none" }}
                />
            </div>
        </>
    );
};

export default Button;
