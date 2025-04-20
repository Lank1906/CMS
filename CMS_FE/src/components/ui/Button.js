import './ui.css';

const Button = ({ value, onClick, backgroundColor, iconLeft, iconRight, color, border, disable }) => {

    return <>
        <div
            onClick={onClick}
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
            }}>
            {iconLeft}
            {value}
            {iconRight}
        </div>
    </>;
};

export default Button;
