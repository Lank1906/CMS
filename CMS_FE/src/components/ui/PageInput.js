import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Button from "./Button";

const PageInput = ({ page }) => {
    const [p, setPage] = useState(page || 1);

    return <>
        <Button
            onClick={() => { if (p === 1) return; setPage(p - 1) }}
            iconLeft={<ChevronLeft />}
            color={"#666"}
            border={"none"}
            disable={p === 1}
        />
        <input value={p}
            style={{
                width: "27px",
                height: "27px",
                display: "flex",
                textAlign: "center",
                backgroundColor: "var(--color-primary)",
                border: "none",
                outline: "none",
                borderRadius: "5px",
                color: "white"
            }}
            onChange={(e) => {
                const value = Number(e.target.value);
                if (isNaN(value)) return;
                if (value < 1) return;
                setPage(value);
            }}

        />
        <Button
            onClick={() => setPage(p + 1)}
            iconLeft={<ChevronRight />}
            color={"#666"}
            border={"none"}
        />
    </>
}
export default PageInput;